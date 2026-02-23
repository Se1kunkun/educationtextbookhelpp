import { useNavigate, useParams } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft, GraduationCap } from "lucide-react";
const sitename = "教具教材ウェブサイト";

// サンプルデータ：各学年・教科ごとの単元
const unitsData: Record<string, Record<string, string[]>> = {
  "4": {
    理科: [
      "月の満ち欠け",
      "天気と気温",
      "電気のはたらき",
      "水のすがた",
      "金属の温度と体積",
      "人の体のつくりと運動",
    ],
    算数: ["大きな数", "わり算", "角", "小数", "面積", "がい数"],
    国語: [
      "物語の読解",
      "説明文の読解",
      "作文の書き方",
      "漢字の学習",
      "詩の鑑賞",
    ],
    社会: ["都道府県", "地図の見方", "交通と産業", "伝統文化"],
    英語: ["アルファベット", "自己紹介", "色と形", "数字", "家族"],
  },
  "3": {
    理科: ["昆虫の育ち方", "植物の育ち方", "太陽の動き", "磁石の性質"],
    算数: ["かけ算", "時刻と時間", "長さ", "重さ", "分数"],
    国語: ["物語の読解", "説明文", "手紙の書き方", "漢字"],
    社会: ["まちの様子", "地図記号", "昔の道具", "仕事"],
  },
  "5": {
    理科: ["天気の変化", "植物の発芽", "メダカの誕生", "電磁石"],
    算数: ["小数のかけ算・わり算", "体積", "合同な図形", "割合"],
    国語: ["説明文", "物語", "敬語", "古典"],
    社会: ["日本の国土", "工業", "農業", "環境"],
    英語: ["過去形", "未来形", "買い物", "道案内"],
  },
};

export default function UnitSelection() {
  const navigate = useNavigate();
  const { grade, subject } = useParams();

  // デフォルトの単元リスト（データがない場合）
  const defaultUnits = [
    "単元1",
    "単元2",
    "単元3",
    "単元4",
  ];

  const units =
    unitsData[grade || ""]?.[subject || ""] || defaultUnits;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 cursor-pointer"
  onClick={() => navigate("/")}
>
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">{sitename}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate(`/subject-selection/${grade}`)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          教科選択に戻る
        </Button>

        <div className="text-center mb-8">
          <div className="flex gap-2 justify-center mb-4">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              {grade}年生
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
              {subject}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">単元を選択</h2>
          <p className="text-gray-600">学習する単元を選んでください</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {units.map((unit, index) => (
            <button
              key={index}
              onClick={() => navigate(`/material/${grade}/${subject}/${encodeURIComponent(unit)}`)}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-blue-500 text-left"
            >
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{unit}</h3>
                  <p className="text-sm text-gray-500 mt-1">教材・教具を見る →</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
