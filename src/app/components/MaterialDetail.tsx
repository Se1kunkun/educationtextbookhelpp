import { useNavigate, useParams } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft, GraduationCap, Clock, Users, Lightbulb, ExternalLink, FileText, PlayCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useCatalog } from "../data/catalog";

export default function MaterialDetail() {
  const navigate = useNavigate();
  const { grade, subject, unit } = useParams();
  const { getMaterial } = useCatalog();

  const material = getMaterial(grade, subject, unit);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">教具教材サイト</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" onClick={() => navigate(`/unit-selection/${grade}/${subject}`)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          単元選択に戻る
        </Button>

        <div className="flex gap-2 items-center text-sm text-gray-600 mb-6 flex-wrap">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{grade}年生</span>
          <span>→</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{subject}</span>
          <span>→</span>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">{unit}</span>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{material.title}</h2>
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

        {material.resourceType !== "none" && material.resourceUrl && (
          <Card className="mb-6 border-blue-200 bg-blue-50/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                {material.resourceType === "video" ? <PlayCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                教材ファイル・教材リンク
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-900 mb-3">{material.resourceTitle || "教材を開く"}</p>
              <a href={material.resourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">
                {material.resourceType === "pdf" ? "PDFを開く" : material.resourceType === "video" ? "動画を開く" : "教材リンクを開く"}
                <ExternalLink className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>
        )}

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

        <Card className="mb-6 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">ポイント・アドバイス</CardTitle>
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

        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate(`/unit-selection/${grade}/${subject}`)} variant="outline" size="lg">
            他の単元を見る
          </Button>
        </div>
      </main>
    </div>
  );
}
