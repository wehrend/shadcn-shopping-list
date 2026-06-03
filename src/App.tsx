import { CheckCircleIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Product = {
  name: string;
  quantity: number;
};

const LOCAL_STORAGE_KEY = "shopping-list";

function App() {
  const [productQuantity, setProductQuantity] = useState(1);
  const [productName, setProductName] = useState("");

  const [list, setList] = useState<Product[]>([]);

  const dataLoaded = useRef(false);

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"));
    dataLoaded.current = true;
  }, []);

  useEffect(() => {
    if (dataLoaded.current)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-semibold mt-16 mb-10">Einkaufsliste</h1>
      <div className="flex w-full gap-2">
        <Input
          placeholder="Produkt eingeben..."
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Input
          type="number"
          className="w-14"
          value={productQuantity}
          onChange={(e) => setProductQuantity(Number(e.target.value))}
        />
      </div>
      <Button
        size={"lg"}
        className="w-full mt-2"
        disabled={productName.length < 1}
        onClick={() => {
          if (list.find((item) => item.name === productName)) {
            toast.error("Hinzufügen fehlgeschlagen", {
              description:
                "Das Produkt ist bereits in der Einkaufsliste vorhanden!",
            });
          } else {
            setList([
              { name: productName, quantity: productQuantity },
              ...list,
            ]);

            setProductQuantity(1);
            setProductName("");
          }
        }}
      >
        Eintrag Hinzufügen
      </Button>
      <div className="flex flex-col w-full gap-2 mt-6">
        {list.map((item) => (
          <div
            className="rounded-xl border bg-card text-card-foreground shadow p-6 flex justify-between items-center"
            key={item.name}
          >
            <div>
              <h3 className="text-large font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                Anzahl:{item.quantity}
              </p>
            </div>
            <Button size={"lg"} variant={"outline"}>
              <CheckCircleIcon />
              Abhaken
            </Button>
          </div>
        ))}
        ;
      </div>
    </div>
  );
}

export default App;
