import { useNavigate, useParams } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft, GraduationCap, Clock, Users, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// サンプルデータ：教材の詳細情報
const materialData: Record<string, any> = {
  "4_理科_月の満ち欠け": {
    title: "月の満ち欠けモデル",
    overview: "発泡スチロール球とライトを使って、月の満ち欠けを視覚的に理解できる教具です。",
    materials: [
      "発泡スチロール球（直径10cm）",
      "懐中電灯またはLEDライト",
      "竹串または棒",
      "黒い画用紙",
      "マジック（黒）",
    ],
    howToMake: [
      "発泡スチロール球の半分を黒いマジックで塗ります",
      "竹串を発泡スチロール球に刺して持ち手を作ります",
      "黒い画用紙で暗い空間を作ります（大きな箱の中など）",
      "懐中電灯を固定して「太陽」として設置します",
    ],
    howToUse: [
      "【導入】実際の月の写真を見せて、月の形が変わることを確認します",
      "【展開1】教室を暗くして、懐中電灯を「太陽」として点灯します",
      "【展開2】発泡スチロール球を「月」として、太陽の周りを回転させます",
      "【展開3】自分の目（地球）から見える月の形がどう変わるか観察します",
      "【まとめ】月・地球・太陽の位置関係と月の見え方をワークシートにまとめます",
    ],
    tips: [
      "1人1セット用意すると、個別に体験できて理解が深まります",
      "教室が明るい場合は、段ボール箱の中で実験すると効果的です",
      "月の満ち欠けの周期（約30日）についても触れましょう",
    ],
    timeRequired: "45分（1時間）",
    difficulty: "中",
  },
};

export default function MaterialDetail() {
  const navigate = useNavigate();
  const { grade, subject, unit } = useParams();

  // デフォルトデータ
  const key = `${grade}_${subject}_${unit}`;
  const material = materialData[key] || {
    title: unit,
    overview: "この単元の教材・教具の情報です。",
    materials: ["材料1", "材料2", "材料3"],
    howToMake: ["手順1", "手順2", "手順3"],
    howToUse: ["使い方1", "使い方2", "使い方3"],
    tips: ["ポイント1", "ポイント2"],
    timeRequired: "45分",
    difficulty: "中",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 cursor-pointer"
  onClick={() => navigate("/")}
>
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">教具教材サイト</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate(`/unit-selection/${grade}/${subject}`)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          単元選択に戻る
        </Button>

        {/* パンくずリスト */}
        <div className="flex gap-2 items-center text-sm text-gray-600 mb-6 flex-wrap">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {grade}年生
          </span>
          <span>→</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
            {subject}
          </span>
          <span>→</span>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
            {unit}
          </span>
        </div>

        {/* タイトル */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {material.title}
          </h2>
          <p className="text-gray-600 text-lg">{material.overview}</p>

          <div className="flex gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>所要時間: {material.timeRequired}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>難易度: {material.difficulty}</span>
            </div>
          </div>
        </div>

        {/* 必要な材料 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              必要な材料
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {material.materials.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 作り方 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>作り方</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {material.howToMake.map((step: string, index: number) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* 授業での使い方 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>授業での使い方</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {material.howToUse.map((step: string, index: number) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* ポイント・アドバイス */}
        <Card className="mb-6 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">
              ポイント・アドバイス
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {material.tips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1 text-xl">💡</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 戻るボタン */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => navigate(`/unit-selection/${grade}/${subject}`)}
            variant="outline"
            size="lg"
          >
            他の単元を見る
          </Button>
        </div>
      </main>
    </div>
  );
}
