import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, GraduationCap, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  gradeOptions,
  listHelpers,
  subjectOptions,
  type MaterialEntry,
  type MaterialResourceType,
  useCatalog,
} from "../data/catalog";

const sitename = "教具教材ウェブサイト";
const ADMIN_AUTH_KEY = "admin-authenticated";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

const resourceTypeOptions: { value: MaterialResourceType; label: string }[] = [
  { value: "none", label: "なし" },
  { value: "link", label: "外部リンク" },
  { value: "pdf", label: "PDF教材" },
  { value: "video", label: "動画" },
];

type MaterialForm = {
  unit: string;
  title: string;
  overview: string;
  materials: string;
  howToMake: string;
  howToUse: string;
  tips: string;
  timeRequired: string;
  difficulty: string;
  resourceType: MaterialResourceType;
  resourceTitle: string;
  resourceUrl: string;
};

const initialForm: MaterialForm = {
  unit: "",
  title: "",
  overview: "",
  materials: "",
  howToMake: "",
  howToUse: "",
  tips: "",
  timeRequired: "45分",
  difficulty: "中",
  resourceType: "none",
  resourceTitle: "",
  resourceUrl: "",
};

export default function AdminMaterialManager() {
  const navigate = useNavigate();
  const { catalog, deleteMaterial, upsertMaterial } = useCatalog();

  const [grade, setGrade] = useState("4");
  const [subject, setSubject] = useState("理科");
  const [message, setMessage] = useState("");
  const [editingUnit, setEditingUnit] = useState<string | null>(null);
  const [form, setForm] = useState<MaterialForm>(initialForm);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem(ADMIN_AUTH_KEY) === "true");
  }, []);

  const units = useMemo(
    () =>
      Object.entries(catalog[grade]?.[subject] ?? {}).sort((a, b) =>
        a[0].localeCompare(b[0]),
      ),
    [catalog, grade, subject],
  );

  const resetForm = () => {
    setEditingUnit(null);
    setForm(initialForm);
  };

  const updateForm = (key: keyof MaterialForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onEdit = (unit: string, material: MaterialEntry) => {
    setEditingUnit(unit);
    setForm({
      unit,
      title: material.title,
      overview: material.overview,
      materials: listHelpers.serializeList(material.materials),
      howToMake: listHelpers.serializeList(material.howToMake),
      howToUse: listHelpers.serializeList(material.howToUse),
      tips: listHelpers.serializeList(material.tips),
      timeRequired: material.timeRequired,
      difficulty: material.difficulty,
      resourceType: material.resourceType,
      resourceTitle: material.resourceTitle,
      resourceUrl: material.resourceUrl,
    });
    setMessage(`「${unit}」を編集中です。`);
  };

  const onSave = () => {
    if (!form.unit.trim()) {
      setMessage("単元名は必須です。");
      return;
    }

    if (form.resourceType !== "none" && !form.resourceUrl.trim()) {
      setMessage("教材URLを入力してください。");
      return;
    }

    const unit = form.unit.trim();
    upsertMaterial(grade, subject, unit, {
      title: form.title.trim() || unit,
      overview: form.overview.trim() || "この単元の教材・教具の情報です。",
      materials: listHelpers.parseList(form.materials),
      howToMake: listHelpers.parseList(form.howToMake),
      howToUse: listHelpers.parseList(form.howToUse),
      tips: listHelpers.parseList(form.tips),
      timeRequired: form.timeRequired.trim() || "45分",
      difficulty: form.difficulty.trim() || "中",
      resourceType: form.resourceType,
      resourceTitle: form.resourceTitle.trim(),
      resourceUrl: form.resourceUrl.trim(),
    });

    setMessage(editingUnit ? `「${unit}」を更新しました。` : `「${unit}」を追加しました。`);
    resetForm();
  };

  const onDelete = (unit: string) => {
    deleteMaterial(grade, subject, unit);
    setMessage(`「${unit}」を削除しました。`);
    if (editingUnit === unit) resetForm();
  };

  const onLogin = () => {
    if (password !== ADMIN_PASSWORD) {
      setMessage("管理者パスワードが違います。");
      return;
    }

    localStorage.setItem(ADMIN_AUTH_KEY, "true");
    setIsAuthenticated(true);
    setPassword("");
    setMessage("管理者としてログインしました。");
  };

  const onLogout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
    resetForm();
    setMessage("ログアウトしました。");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">{sitename}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {!isAuthenticated ? (
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>管理者ログイン</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">この画面は管理者専用です。パスワードを入力してください。</p>
              <label className="text-sm font-medium text-gray-700 block">
                パスワード
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border rounded-md p-2" />
              </label>
              <Button onClick={onLogin}>ログイン</Button>
              {message && <p className="text-sm text-red-600">{message}</p>}
            </CardContent>
          </Card>
        ) : (
          <>
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              ホームに戻る
            </Button>

            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">教材管理（管理者向け）</h2>
              <p className="text-gray-600">単元ごとの教材を追加・更新・削除できます（このブラウザのローカル保存）。</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>対象の学年・教科</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="text-sm font-medium text-gray-700">学年
                  <select value={grade} onChange={(e) => setGrade(e.target.value)} className="mt-1 w-full border rounded-md p-2">
                    {gradeOptions.map((gradeOption) => (
                      <option key={gradeOption} value={gradeOption}>{gradeOption}年生</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-medium text-gray-700">教科
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full border rounded-md p-2">
                    {subjectOptions.map((subjectOption) => (
                      <option key={subjectOption} value={subjectOption}>{subjectOption}</option>
                    ))}
                  </select>
                </label>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{editingUnit ? "教材を編集" : "教材を追加"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="text-sm font-medium text-gray-700 block">単元名（必須）
                  <input value={form.unit} onChange={(e) => updateForm("unit", e.target.value)} className="mt-1 w-full border rounded-md p-2" />
                </label>

                <label className="text-sm font-medium text-gray-700 block">教材タイトル
                  <input value={form.title} onChange={(e) => updateForm("title", e.target.value)} className="mt-1 w-full border rounded-md p-2" />
                </label>

                <label className="text-sm font-medium text-gray-700 block">概要
                  <textarea value={form.overview} onChange={(e) => updateForm("overview", e.target.value)} className="mt-1 w-full border rounded-md p-2 min-h-20" />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="text-sm font-medium text-gray-700 block">教材タイプ
                    <select value={form.resourceType} onChange={(e) => updateForm("resourceType", e.target.value)} className="mt-1 w-full border rounded-md p-2">
                      {resourceTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm font-medium text-gray-700 block md:col-span-2">教材URL
                    <input value={form.resourceUrl} onChange={(e) => updateForm("resourceUrl", e.target.value)} placeholder="https://..." className="mt-1 w-full border rounded-md p-2" />
                  </label>
                </div>

                <label className="text-sm font-medium text-gray-700 block">教材表示名（任意）
                  <input value={form.resourceTitle} onChange={(e) => updateForm("resourceTitle", e.target.value)} className="mt-1 w-full border rounded-md p-2" />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="text-sm font-medium text-gray-700 block">必要な材料（1行に1項目）
                    <textarea value={form.materials} onChange={(e) => updateForm("materials", e.target.value)} className="mt-1 w-full border rounded-md p-2 min-h-28" />
                  </label>
                  <label className="text-sm font-medium text-gray-700 block">ポイント・アドバイス（1行に1項目）
                    <textarea value={form.tips} onChange={(e) => updateForm("tips", e.target.value)} className="mt-1 w-full border rounded-md p-2 min-h-28" />
                  </label>
                  <label className="text-sm font-medium text-gray-700 block">作り方（1行に1手順）
                    <textarea value={form.howToMake} onChange={(e) => updateForm("howToMake", e.target.value)} className="mt-1 w-full border rounded-md p-2 min-h-28" />
                  </label>
                  <label className="text-sm font-medium text-gray-700 block">授業での使い方（1行に1手順）
                    <textarea value={form.howToUse} onChange={(e) => updateForm("howToUse", e.target.value)} className="mt-1 w-full border rounded-md p-2 min-h-28" />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="text-sm font-medium text-gray-700 block">所要時間
                    <input value={form.timeRequired} onChange={(e) => updateForm("timeRequired", e.target.value)} className="mt-1 w-full border rounded-md p-2" />
                  </label>
                  <label className="text-sm font-medium text-gray-700 block">難易度
                    <input value={form.difficulty} onChange={(e) => updateForm("difficulty", e.target.value)} className="mt-1 w-full border rounded-md p-2" />
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button onClick={onSave}>{editingUnit ? "更新する" : "追加する"}</Button>
                  <Button variant="outline" onClick={resetForm}>入力をクリア</Button>
                </div>

                {message && <p className="text-sm text-blue-700">{message}</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>登録済み教材（{grade}年生 / {subject}）</CardTitle>
              </CardHeader>
              <CardContent>
                {units.length === 0 ? (
                  <p className="text-gray-600">まだ教材がありません。</p>
                ) : (
                  <ul className="space-y-2">
                    {units.map(([unit, material]) => (
                      <li key={unit} className="border rounded-md p-3 flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-800">{unit}</p>
                          <p className="text-sm text-gray-600">{material.title}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => onEdit(unit, material)}>
                            <Pencil className="w-4 h-4 mr-1" /> 編集
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => onDelete(unit)}>
                            <Trash2 className="w-4 h-4 mr-1" /> 削除
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <div>
              <Button variant="outline" onClick={onLogout}>ログアウト</Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
