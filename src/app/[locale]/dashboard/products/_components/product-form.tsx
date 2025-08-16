"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useProductSchema, ProductFormValues } from "@/lib/schemas/product.schema";
import { useToast } from "@/hooks/use-toast";
import { occasion } from "@/lib/types/occasions";
import { Categories } from "@/lib/types/category";
import { Product } from "@/lib/types/products";
import useAddProduct from "../_hooks/use-add-product";
import useUpdateProduct from "../_hooks/use-update-product";

export default function ProductForm({
  occasions,
  categories,
  edit = false,
  product,
}: {
  occasions: occasion[];
  categories: Categories[];
  edit?: boolean;
  product?: Product;
}) {
  // Hooks
  const { toast } = useToast();
  const t = useTranslations();
  const { addProduct, isPending: isAdding } = useAddProduct();
  const { updateProduct, isPending: isUpdating } = useUpdateProduct();

  // Variables
  const isPending = isAdding || isUpdating;
  const productSchema = useProductSchema(edit);

  // Form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      price: product?.price || 0,
      discount: 0,
      priceAfterDiscount: product?.priceAfterDiscount || 0,
      quantity: product?.quantity || 0,
      productCover: [],
      productGallery: [],
      category: product?.category || "",
      occasion: product?.occasion || "",
    },
  });

  // OnSubmit function
  const onSubmit = async (data: ProductFormValues) => {
    // Product Data that will be sent to the api
    const productData = {
      title: data.title,
      description: data.description,
      quantity: data.quantity,
      price: data.price,
      discount: data.discount,
      priceAfterDiscount: data.priceAfterDiscount,
      category: data.category,
      occasion: data.occasion,
      imgCover: data.productCover?.[0] || new File([], ""),
      images: data.productGallery || [],
    };

    // when edit is true call the edit hook else call the add hook
    if (edit && product?._id) {
      updateProduct(
        { productId: product._id, fields: productData },
        {
          onSuccess: () => {
            toast({
              title: t("messages.success"),
              description: t("messages.product_updated"),
              variant: "default",
            });
          },
          onError: (error) => {
            toast({
              title: t("messages.error"),
              description: error.message || t("messages.failed_to_update"),
              variant: "destructive",
            });
          },
        },
      );
    } else if (edit && !product?._id) {
      toast({
        title: t("messages.error"),
        description: t("messages.product_id_required"),
        variant: "destructive",
      });
      return;
    } else {
      // Add new product
      addProduct(productData, {
        onSuccess: () => {
          toast({
            title: t("messages.success"),
            description: t("messages.product_added"),
            variant: "default",
          });
          form.reset();
        },
        onError: (error) => {
          toast({
            title: t("messages.error"),
            description: error.message || t("messages.failed_to_add"),
            variant: "destructive",
          });
        },
      });
    }
  };
  return (
    <div className="space-y-6 bg-white  max-w-4xl w-full mx-auto rounded-xl px-6 py-4">
      <h1 className="text-2xl font-semibold text-foreground">
        {edit ? t("product.edit_title") : t("product.add_title")}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("product.title")} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("product.title_placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("product.description")} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("product.description_placeholder")}
                    className={cn(form.formState.errors.description && "border-red-600")}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          {/* Price Fields Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("product.price")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("product.price_placeholder")}
                      {...field}
                      onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                      className={form.formState.errors.price ? "border-red-500" : ""}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("product.discount")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("product.discount_placeholder")}
                      {...field}
                      onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priceAfterDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("product.price_after_discount")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("product.price_after_discount_placeholder")}
                      {...field}
                      onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </div>

          {/* Quantity Field */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("product.quantity")} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={t("product.quantity_placeholder")}
                    {...field}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                    className={form.formState.errors.quantity ? "border-red-500" : ""}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          {!edit && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Cover Image Field*/}
              <FormField
                control={form.control}
                name="productCover"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>
                      {t("product.product_cover")} <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="product-cover-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            onChange([files[0]]);
                          }
                        }}
                        className={form.formState.errors.productCover ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Product Gallery Field  */}
              <FormField
                control={form.control}
                name="productGallery"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>
                      {t("product.product_gallery")} <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="product-gallery-input"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const newFiles = e.target.files;
                          if (newFiles && newFiles.length > 0) {
                            // Convert existing value to array if it exists
                            const existingFiles = Array.isArray(value) ? value : [];

                            // Add new files to existing ones
                            const allFiles = [...existingFiles, ...Array.from(newFiles)];

                            // Update the form with combined files
                            onChange(allFiles);
                          }
                        }}
                        className={form.formState.errors.productGallery ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                    {value && value.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          {t("product.selected_files")}: {value.length}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          {value.map((file, index) => (
                            <div key={index} className="relative group">
                              <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                width={80}
                                height={80}
                                className=" object-cover rounded-lg border border-gray-200 shadow-sm"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedFiles = value.filter((_, i) => i !== index);
                                  onChange(updatedFiles);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition-colors"
                              >
                                ×
                              </button>
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded-b-lg truncate">
                                {file.name.length > 15
                                  ? file.name.substring(0, 15) + "..."
                                  : file.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Category Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("product.category")} <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={form.formState.errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder={t("product.category_placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          {/* Occasion Field */}
          <FormField
            control={form.control}
            name="occasion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("product.occasion")} <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={form.formState.errors.occasion ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder={t("product.occasion_placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {occasions.map((occasion) => (
                      <SelectItem key={occasion._id} value={occasion._id}>
                        {occasion.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-maroon-600 hover:bg-maroon-700 h-10 text-white py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending
              ? edit
                ? t("product.updating_product")
                : t("product.adding_product")
              : edit
                ? t("product.update_button")
                : t("product.add_button")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
