import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { BookOpen, GraduationCap } from "lucide-react";
const sitename = "教具教材ウェブサイト";

export default function Home() {
  const navigate = useNavigate();

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
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            教材・教具の作り方と授業での使い方を共有するサイト
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            このウェブサイトにどんな情報がのっているのついて、どんな目的でつくったのかをかりーン
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <div className="flex flex-col items-center gap-6">
              <BookOpen className="w-16 h-16 text-blue-600" />
              <Button
                onClick={() => navigate("/grade-selection")}
                size="lg"
                className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700"
              >
                教具・教材を探す
              </Button>
              <p className="text-sm text-gray-500 text-center">
                学年・教科・単元から教材を検索できます
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl w-full">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">学年を選ぶ</h3>
                <p className="text-sm text-gray-600">
                  小学1年生から6年生まで選択
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">教科を選ぶ</h3>
                <p className="text-sm text-gray-600">
                  理科、国語、算数、英語など
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">単元を選ぶ</h3>
                <p className="text-sm text-gray-600">
                  教材の作り方と使い方を確認
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
