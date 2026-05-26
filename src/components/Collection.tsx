import { useEffect, useRef, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  link: string;
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Essentials Hoodie",
    description: "Klasyczny kremowy hoodie, gramatura premium.",
    price: "299 zł",
    image: "",
    link: "https://example.com",
  },
  {
    id: "p2",
    name: "Trapstar Tracksuit",
    description: "Komplet dresowy 1:1, wszystkie detale.",
    price: "549 zł",
    image: "",
    link: "https://example.com",
  },
  {
    id: "p3",
    name: "Corteiz Cargo",
    description: "Bojówki w stylu UK streetwear.",
    price: "349 zł",
    image: "",
    link: "https://example.com",
  },
  {
    id: "p4",
    name: "Stussy Tee",
    description: "Bawełna 100%, ciężki materiał.",
    price: "189 zł",
    image: "",
    link: "https://example.com",
  },
  {
    id: "p5",
    name: "Yeezy Slide",
    description: "Wygodne klapki, idealna kopia.",
    price: "259 zł",
    image: "",
    link: "https://example.com",
  },
  {
    id: "p6",
    name: "Nike Tech Fleece",
    description: "Pełen komplet, dyskretne logo.",
    price: "499 zł",
    image: "",
    link: "https://example.com",
  },
];

const LS_KEY = "repzilla_products_v1";

export default function Collection() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Product[];
        if (Array.isArray(parsed) && parsed.length) setProducts(parsed);
      }
    } catch {}
  }, []);

  const persist = (next: Product[]) => {
    setProducts(next);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next));
    } catch {}
  };

  const updateField = (id: string, field: keyof Product, value: string) => {
    persist(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleImage = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      updateField(id, "image", String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const tryLogin = () => {
    if (pw === "admin123") {
      setIsAdmin(true);
      setShowLogin(false);
      setPw("");
      setPwError("");
    } else {
      setPwError("Nieprawidłowe hasło");
    }
  };

  return (
    <section id="kolekcja" className="relative z-10 px-4 sm:px-8 py-24 max-w-7xl mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
        <div>
          <p className="text-[#aac4ff] text-xs tracking-[0.4em] mb-3 font-heading">DROP 001</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            KOLEKCJA
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl">
            Wyselekcjonowane sztuki. Każda pozycja sprawdzona pod kątem jakości 1:1.
          </p>
        </div>
        <div className="flex gap-2">
          {isAdmin ? (
            <button
              onClick={() => setIsAdmin(false)}
              className="btn-ghost-navy px-4 py-2 text-sm rounded font-heading uppercase tracking-wider"
            >
              Wyjdź z trybu admina
            </button>
          ) : (
            <button
              onClick={() => setShowLogin((s) => !s)}
              className="btn-ghost-navy px-4 py-2 text-sm rounded font-heading uppercase tracking-wider"
            >
              Admin
            </button>
          )}
        </div>
      </div>

      {showLogin && !isAdmin && (
        <div className="mb-8 max-w-sm bg-[#0a0a0f] border border-[#2040a0] rounded p-4 navy-glow">
          <label className="block text-xs text-[#aac4ff] mb-2 tracking-widest">HASŁO ADMINA</label>
          <div className="flex gap-2">
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && tryLogin()}
              className="flex-1 bg-black border border-[#2040a0] text-white px-3 py-2 rounded outline-none focus:border-[#4a7fff]"
              placeholder="••••••••"
            />
            <button onClick={tryLogin} className="btn-navy px-4 py-2 rounded text-sm">
              OK
            </button>
          </div>
          {pwError && <p className="text-red-400 text-xs mt-2">{pwError}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            isAdmin={isAdmin}
            onField={(f, v) => updateField(p.id, f, v)}
            onImage={(file) => handleImage(p.id, file)}
          />
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  isAdmin,
  onField,
  onImage,
}: {
  product: Product;
  isAdmin: boolean;
  onField: (field: keyof Product, value: string) => void;
  onImage: (file: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="navy-glow rounded-lg overflow-hidden flex flex-col"
      style={{
        background: "#0a0a0f",
        border: "1.5px solid #2040a0",
      }}
    >
      <div className="relative aspect-square bg-black overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs tracking-widest">
            BRAK ZDJĘCIA
          </div>
        )}
        {isAdmin && (
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-2 right-2 btn-navy text-xs px-3 py-1.5 rounded"
          >
            Zmień zdjęcie
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onImage(f);
          }}
        />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        {isAdmin ? (
          <>
            <input
              value={product.name}
              onChange={(e) => onField("name", e.target.value)}
              className="bg-black border border-[#2040a0] text-white px-2 py-1 rounded text-sm font-heading"
              placeholder="Nazwa"
            />
            <textarea
              value={product.description}
              onChange={(e) => onField("description", e.target.value)}
              className="bg-black border border-[#2040a0] text-gray-300 px-2 py-1 rounded text-xs"
              placeholder="Opis"
              rows={2}
            />
            <input
              value={product.price}
              onChange={(e) => onField("price", e.target.value)}
              className="bg-black border border-[#2040a0] text-white px-2 py-1 rounded text-sm"
              placeholder="Cena"
            />
            <input
              value={product.link}
              onChange={(e) => onField("link", e.target.value)}
              className="bg-black border border-[#2040a0] text-[#aac4ff] px-2 py-1 rounded text-xs"
              placeholder="Link zewnętrzny"
            />
          </>
        ) : (
          <>
            <h3 className="font-heading text-xl font-semibold text-white uppercase tracking-wider">
              {product.name}
            </h3>
            <p className="text-sm text-gray-400 flex-1">{product.description}</p>
            <p className="text-lg font-bold chrome-text font-display">{product.price}</p>
          </>
        )}
        <a
          href={product.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-navy mt-2 w-full text-center px-4 py-2.5 rounded text-sm font-heading uppercase tracking-widest"
        >
          Zobacz produkt
        </a>
      </div>
    </div>
  );
}
