import { useNavigate, useParams } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft, GraduationCap } from "lucide-react";
const sitename = "教具教材ウェブサイト";


const subjects = [
  { id: "国語", label: "国語", color: "bg-red-500", hoverColor: "hover:bg-red-600" },
  { id: "算数", label: "算数", color: "bg-blue-500", hoverColor: "hover:bg-blue-600" },
  { id: "理科", label: "理科", color: "bg-green-500", hoverColor: "hover:bg-green-600" },
  { id: "社会", label: "社会", color: "bg-yellow-500", hoverColor: "hover:bg-yellow-600" },
  { id: "英語", label: "英語", color: "bg-purple-500", hoverColor: "hover:bg-purple-600" },
  { id: "音楽", label: "音楽", color: "bg-pink-500", hoverColor: "hover:bg-pink-600" },
  { id: "図工", label: "図工", color: "bg-orange-500", hoverColor: "hover:bg-orange-600" },
  { id: "体育", label: "体育", color: "bg-cyan-500", hoverColor: "hover:bg-cyan-600" },
];

export default function SubjectSelection() {
  const navigate = useNavigate();
  const { grade } = useParams();

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
          onClick={() => navigate("/grade-selection")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          学年選択に戻る
        </Button>

        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            {grade}年生
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">教科を選択</h2>
          <p className="text-gray-600">学習する教科を選んでください</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => navigate(`/unit-selection/${grade}/${subject.id}`)}
              className={`${subject.color} ${subject.hoverColor} text-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105`}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">{subject.label}</div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
