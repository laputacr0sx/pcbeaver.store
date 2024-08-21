export type GetAllProductsDTO = {
  content: Product[];
  last: boolean;
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type Product = {
  brand: Brand;
  category: Category;
  hasStock: boolean;
  imageUrl: string;
  name: string;
  pid: number;
  price: number;
};

export type Brand =
  | "Corsair"
  | "ASUS"
  | "MSI"
  | "Gigabyte"
  | "G.SKILL"
  | "Fractal Design"
  | "Lian Li"
  | "Cooler Master"
  | "NZXT"
  | "Kingston"
  | "Jonsbo"
  | "Logitech"
  | "Antec"
  | "Noctua"
  | "SilverStone"
  | "Thermaltake"
  | "Phanteks"
  | "Cougar"
  | "ASRock"
  | "WD"
  | "Acer"
  | "ADATA"
  | "QNAP"
  | "Thermalright"
  | "Be Quiet!"
  | "Intel"
  | "Samsung"
  | "DeepCool"
  | "Razer"
  | "Klevv"
  | "Valkyrie"
  | "FSP"
  | "Microsoft"
  | "ROCCAT"
  | "LG"
  | "Arctic"
  | "Seasonic"
  | "BenQ"
  | "Netgear"
  | "Colorful"
  | "AMD"
  | "Seagate"
  | "In Win"
  | "ZOWIE"
  | "Dell"
  | "GALAX"
  | "Glorious"
  | "Montech"
  | "Sapphire"
  | "PowerColor"
  | "AsiaHorse"
  | "Keychron"
  | "Super Flower"
  | "Ducky"
  | "ViewSonic"
  | "Inno3D"
  | "Toshiba"
  | "Anacomda"
  | "GELID"
  | "Creative"
  | "AOC"
  | "EIZO"
  | "Synology"
  | "EK"
  | "HYTE"
  | "Crucial"
  | "ProArtist"
  | "Scythe"
  | "PNY"
  | "Linksys"
  | "TCOMAS"
  | "TRYX"
  | "Leadtek"
  | "Tecware"
  | "DarkFlash"
  | "EPOS"
  | "Elgato"
  | "Abkoncore"
  | "Verbatim"
  | "SSUPD"
  | "Sennheiser"
  | "GEIL"
  | "Enermax"
  | "Belkin"
  | "Cherry"
  | "Oculus"
  | "HTC"
  | "INNOCN"
  | "Lenovo"
  | "Geometric Future"
  | "SteelSeries"
  | "GUNNIR"
  | "Lexar"
  | "Polar"
  | "HP"
  | "MagniumGear"
  | "AeroCool"
  | "Jonsplus"
  | "RAIJINTEK"
  | "Edifier"
  | "Team"
  | "Faroll"
  | "CABLE"
  | "EKWB"
  | "Sony"
  | "NVIDIA"
  | "Patriot"
  | "Cemac"
  | "Amart"
  | "upHere"
  | "Felton"
  | "RIVIA"
  | "ABKO"
  | "XTRIKE ME"
  | "Thunderobot"
  | "Machenike"
  | "Pico"
  | "Solidigm"
  | "Transcend"
  | "AITC"
  | "ARES"
  | "Bitfenix"
  | "Synnex"
  | "Palit"
  | "Topperstech"
  | "A200"
  | "occomputer"
  | "Hornington"
  | "Philips"
  | "AmpliFi"
  | "Craft"
  | "Schneider"
  | "OCPC"
  | "Altech"
  | "Courgar"
  | "QC"
  | "EPS"
  | "PowerA";

export type Category =
  | "CHASSIS"
  | "RAM"
  | "COOLER"
  | "DISPLAY"
  | "POWER_SUPPLY"
  | "FAN"
  | "GPU"
  | "MOTHER_BOARD"
  | "MOUSE"
  | "KEYBOARD"
  | "SSD"
  | "HEADPHONE"
  | "ROUTER"
  | "NAS"
  | "HDD"
  | "CPU";
