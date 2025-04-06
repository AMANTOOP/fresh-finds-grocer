
import React, { useState } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Product, Category, ProductTranslations } from '@/types';
import { PlusCircle, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const InventoryPage = () => {
  const { user } = useAuth();
  const { translate, currentLanguage } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [productForm, setProductForm] = useState({
    name: '',
    nameTranslations: { en: '', te: '' },
    category: '',
    price: 0,
    quantity: 0,
    unit: 'kg',
    unitTranslations: { en: 'kg', te: 'కిలో' },
    image: ''
  });
  
  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', user?.storeId],
    queryFn: () => getProducts(user?.storeId),
    enabled: !!user?.storeId
  });
  
  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  // Filter products
  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product created",
        description: "The product has been added successfully",
      });
      handleCloseDialog();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) => 
      updateProduct(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product updated",
        description: "The product has been updated successfully",
      });
      handleCloseDialog();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product deleted",
        description: "The product has been removed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      nameTranslations: { en: '', te: '' },
      category: '',
      price: 0,
      quantity: 0,
      unit: 'kg',
      unitTranslations: { en: 'kg', te: 'కిలో' },
      image: ''
    });
    setIsDialogOpen(true);
  };
  
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      nameTranslations: product.nameTranslations || { en: product.name, te: '' },
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      unit: product.unit,
      unitTranslations: product.unitTranslations || { en: product.unit, te: '' },
      image: product.image || ''
    });
    setIsDialogOpen(true);
  };
  
  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(id);
    }
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Make sure English name is set
    const nameTranslations: ProductTranslations = {
      en: productForm.nameTranslations.en || productForm.name,
      te: productForm.nameTranslations.te || ''
    };
    
    // Get category translations
    const selectedCategory = categories.find(cat => cat.name === productForm.category);
    const categoryTranslations: ProductTranslations = selectedCategory?.nameTranslations || { 
      en: productForm.category, 
      te: '' 
    };
    
    const productData = {
      name: productForm.name,
      nameTranslations,
      category: productForm.category,
      categoryTranslations,
      price: Number(productForm.price),
      quantity: Number(productForm.quantity),
      unit: productForm.unit,
      unitTranslations: productForm.unitTranslations,
      image: productForm.image,
      storeId: user?.storeId || ''
    };
    
    if (editingProduct) {
      updateProductMutation.mutate({ 
        id: editingProduct.id, 
        updates: productData 
      });
    } else {
      createProductMutation.mutate(productData);
    }
  };
  
  const handleFormChange = (field: string, value: any) => {
    setProductForm(prev => ({ ...prev, [field]: value }));
  };
  
  const handleNameTranslationChange = (lang: string, value: string) => {
    setProductForm(prev => ({
      ...prev,
      nameTranslations: {
        ...prev.nameTranslations,
        [lang]: value
      }
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{translate('nav.inventory')}</h1>
        <Button onClick={handleAddProduct}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {translate('products.add')}
        </Button>
      </div>
      
      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={translate('products.search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="relative overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">{translate('forms.name')}</th>
                  <th className="px-6 py-3">{translate('forms.category')}</th>
                  <th className="px-6 py-3">{translate('forms.price')}</th>
                  <th className="px-6 py-3">{translate('forms.quantity')}</th>
                  <th className="px-6 py-3">{translate('products.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center">Loading...</td>
                  </tr>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product: Product) => (
                    <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {product.nameTranslations[currentLanguage] || product.name}
                      </td>
                      <td className="px-6 py-4">
                        {product.categoryTranslations?.[currentLanguage] || product.category}
                      </td>
                      <td className="px-6 py-4">₹{product.price}</td>
                      <td className="px-6 py-4">
                        {product.quantity} {product.unitTranslations?.[currentLanguage] || product.unit}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            {translate('products.edit')}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            {translate('products.delete')}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      {translate('products.noResults')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Product Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? `Edit ${editingProduct.name}` : translate('products.add')}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{translate('forms.name')} (English)</Label>
                <Input
                  id="name"
                  value={productForm.nameTranslations.en || productForm.name}
                  onChange={(e) => handleNameTranslationChange('en', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="name_te">{translate('forms.name')} (Telugu)</Label>
                <Input
                  id="name_te"
                  value={productForm.nameTranslations.te}
                  onChange={(e) => handleNameTranslationChange('te', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">{translate('forms.category')}</Label>
                <Select 
                  value={productForm.category} 
                  onValueChange={(value) => handleFormChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category: Category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.nameTranslations[currentLanguage] || category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="unit">{translate('forms.unit')}</Label>
                <Select 
                  value={productForm.unit} 
                  onValueChange={(value) => handleFormChange('unit', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                    <SelectItem value="l">Liter (l)</SelectItem>
                    <SelectItem value="ml">Milliliter (ml)</SelectItem>
                    <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                    <SelectItem value="dozen">Dozen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">{translate('forms.price')}</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => handleFormChange('price', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="quantity">{translate('forms.quantity')}</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={productForm.quantity}
                  onChange={(e) => handleFormChange('quantity', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="image">{translate('forms.image')} URL</Label>
              <Input
                id="image"
                type="url"
                value={productForm.image}
                onChange={(e) => handleFormChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            {/* Preview image if URL is provided */}
            {productForm.image && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Image Preview:</p>
                <img
                  src={productForm.image}
                  alt="Product preview"
                  className="h-32 w-auto object-contain border rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
            )}
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                {translate('forms.cancel')}
              </Button>
              <Button type="submit">
                {editingProduct ? translate('products.edit') : translate('forms.submit')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryPage;
