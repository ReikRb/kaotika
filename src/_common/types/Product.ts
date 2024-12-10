import { Armor } from "../interfaces/Armor";
import { Artifact } from "../interfaces/Artifact";
import { Boot } from "../interfaces/Boot";
import { Helmet } from "../interfaces/Helmet";
import { Ingredient } from "../interfaces/Ingredient";
import { Ring } from "../interfaces/Ring";
import { Shield } from "../interfaces/Shield";
import { Weapon } from "../interfaces/Weapon";

export type Products = Product[];
export type Product = Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient;