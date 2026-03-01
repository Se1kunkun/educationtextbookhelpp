import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type MaterialEntry = {
  title: string;
  overview: string;
  materials: string[];
  howToMake: string[];
  howToUse: string[];
  tips: string[];
  timeRequired: string;
  difficulty: string;
};

export type Catalog = Record<string, Record<string, Record<string, MaterialEntry>>>;

const STORAGE_KEY = "education-material-catalog";

export const gradeOptions = ["1", "2", "3", "4", "5", "6"];

export const subjectOptions = ["国語", "算数", "理科", "社会", "英語", "音楽", "図工", "体育"];

const defaultMaterial = (unit: string): MaterialEntry => ({
  title: unit,
  overview: "この単元の教材・教具の情報です。",
  materials: ["材料1", "材料2", "材料3"],
  howToMake: ["手順1", "手順2", "手順3"],
  howToUse: ["使い方1", "使い方2", "使い方3"],
  tips: ["ポイント1", "ポイント2"],
  timeRequired: "45分",
  difficulty: "中",
});

const initialCatalog: Catalog = {
  "4": {
    理科: {
      月の満ち欠け: {
        title: "月の満ち欠けモデル",
        overview:
          "発泡スチロール球とライトを使って、月の満ち欠けを視覚的に理解できる教具です。",
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
      天気と気温: defaultMaterial("天気と気温"),
      電気のはたらき: defaultMaterial("電気のはたらき"),
      水のすがた: defaultMaterial("水のすがた"),
      金属の温度と体積: defaultMaterial("金属の温度と体積"),
      人の体のつくりと運動: defaultMaterial("人の体のつくりと運動"),
    },
    算数: Object.fromEntries(["大きな数", "わり算", "角", "小数", "面積", "がい数"].map((u) => [u, defaultMaterial(u)])),
    国語: Object.fromEntries(["物語の読解", "説明文の読解", "作文の書き方", "漢字の学習", "詩の鑑賞"].map((u) => [u, defaultMaterial(u)])),
    社会: Object.fromEntries(["都道府県", "地図の見方", "交通と産業", "伝統文化"].map((u) => [u, defaultMaterial(u)])),
    英語: Object.fromEntries(["アルファベット", "自己紹介", "色と形", "数字", "家族"].map((u) => [u, defaultMaterial(u)])),
  },
  "3": {
    理科: Object.fromEntries(["昆虫の育ち方", "植物の育ち方", "太陽の動き", "磁石の性質"].map((u) => [u, defaultMaterial(u)])),
    算数: Object.fromEntries(["かけ算", "時刻と時間", "長さ", "重さ", "分数"].map((u) => [u, defaultMaterial(u)])),
    国語: Object.fromEntries(["物語の読解", "説明文", "手紙の書き方", "漢字"].map((u) => [u, defaultMaterial(u)])),
    社会: Object.fromEntries(["まちの様子", "地図記号", "昔の道具", "仕事"].map((u) => [u, defaultMaterial(u)])),
  },
  "5": {
    理科: Object.fromEntries(["天気の変化", "植物の発芽", "メダカの誕生", "電磁石"].map((u) => [u, defaultMaterial(u)])),
    算数: Object.fromEntries(["小数のかけ算・わり算", "体積", "合同な図形", "割合"].map((u) => [u, defaultMaterial(u)])),
    国語: Object.fromEntries(["説明文", "物語", "敬語", "古典"].map((u) => [u, defaultMaterial(u)])),
    社会: Object.fromEntries(["日本の国土", "工業", "農業", "環境"].map((u) => [u, defaultMaterial(u)])),
    英語: Object.fromEntries(["過去形", "未来形", "買い物", "道案内"].map((u) => [u, defaultMaterial(u)])),
  },
};

type CatalogContextType = {
  catalog: Catalog;
  upsertMaterial: (grade: string, subject: string, unit: string, material: MaterialEntry) => void;
  deleteMaterial: (grade: string, subject: string, unit: string) => void;
  getMaterial: (grade?: string, subject?: string, unit?: string) => MaterialEntry;
};

const CatalogContext = createContext<CatalogContextType | null>(null);

function parseList(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function serializeList(value: string[]): string {
  return value.join("\n");
}

export const listHelpers = { parseList, serializeList };

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<Catalog>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialCatalog;

    try {
      return JSON.parse(saved) as Catalog;
    } catch {
      return initialCatalog;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
  }, [catalog]);

  const value = useMemo<CatalogContextType>(
    () => ({
      catalog,
      upsertMaterial: (grade, subject, unit, material) => {
        setCatalog((prev) => ({
          ...prev,
          [grade]: {
            ...(prev[grade] ?? {}),
            [subject]: {
              ...(prev[grade]?.[subject] ?? {}),
              [unit]: material,
            },
          },
        }));
      },
      deleteMaterial: (grade, subject, unit) => {
        setCatalog((prev) => {
          const next = structuredClone(prev);
          if (!next[grade]?.[subject]?.[unit]) return prev;

          delete next[grade][subject][unit];

          if (Object.keys(next[grade][subject]).length === 0) {
            delete next[grade][subject];
          }
          if (Object.keys(next[grade]).length === 0) {
            delete next[grade];
          }

          return next;
        });
      },
      getMaterial: (grade, subject, unit) => {
        if (!grade || !subject || !unit) return defaultMaterial("教材");
        return catalog[grade]?.[subject]?.[unit] ?? defaultMaterial(unit);
      },
    }),
    [catalog],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }

  return context;
}
