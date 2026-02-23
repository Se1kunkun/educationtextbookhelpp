import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft, GraduationCap } from "lucide-react";
const sitename = "教具教材ウェブサイト";

const grades = [
  { id: "1", label: "1年生" },
  { id: "2", label: "2年生" },
  { id: "3", label: "3年生" },
  { id: "4", label: "4年生" },
  { id: "5", label: "5年生" },
  { id: "6", label: "6年生" },
];

export default function GradeSelection() {
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
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          ホームに戻る
        </Button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">学年を選択</h2>
          <p className="text-gray-600">まず、学年を選んでください</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {grades.map((grade) => (
            <button
              key={grade.id}
              onClick={() => navigate(`/subject-selection/${grade.id}`)}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {grade.id}
                </div>
                <div className="text-lg text-gray-700">{grade.label}</div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
