import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Product } from "../types";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useStock } from "@/contexts/StockContext";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const { translate, currentLanguage } = useLanguage();
  const { user } = useAuth();
  const { getQuantity } = useStock();
  const isAdmin = user?.role === "admin" && user?.storeId === product.storeId;

  const [quantity, setQuantity] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuantity = async () => {
      if (product.name) {
        const qty = await getQuantity(product.name);
        setQuantity(qty);
      }
    };
    fetchQuantity();
  }, [product.name, getQuantity]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden product-card-animation">
      <div className="h-48 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.nameTranslations[currentLanguage] || product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">
              {product.nameTranslations[currentLanguage] || product.name}
            </h3>
            <p className="text-sm text-gray-600">
              {product.categoryTranslations?.[currentLanguage] ||
                product.category}
            </p>
          </div>
          <div className="text-primary font-bold">
            {formatPrice(product.price)}
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium">
              {translate("products.quantity")}:{" "}
            </span>
            {quantity !== null ? (
              quantity === 0 ? (
                <span className="text-red-500 font-semibold">
                  {"Sold Out"}
                </span>
              ) : (
                <span>
                  {quantity}{" "}
                  {product.unitTranslations?.[currentLanguage] || product.unit}
                </span>
              )
            ) : (
              <span>Loading...</span>
            )}
          </div>

          {isAdmin && (
            <div className="flex space-x-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product)}
                  aria-label="Edit product"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(product.id)}
                  aria-label="Delete product"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
