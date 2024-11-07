"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { productDetailsSchema } from "@/schemas/products"
import { createProduct, updateProduct } from "@/server/actions/products"
import { useToast } from "@/hooks/use-toast"
import { RequiredLabelIcon } from "@/components/RequiredLabelIcon"
import { Loader2 } from "lucide-react"

export function ProductDetailsForm({
  product,
}: {
  product?: {
    id: string
    name: string
    description: string | null
    url: string
  }
}) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof productDetailsSchema>>({
    resolver: zodResolver(productDetailsSchema),
    defaultValues: product
      ? { ...product, description: product.description ?? "" }
      : {
          name: "",
          url: "",
          description: "",
        },
  })

  async function onSubmit(values: z.infer<typeof productDetailsSchema>) {
    try {
      const action = product == null 
        ? createProduct 
        : updateProduct.bind(null, product.id)
      const data = await action(values)

      if (data?.message) {
        toast({
          title: data.error ? "Error" : "Success",
          description: data.message,
          variant: data.error ? "destructive" : "default",
        })
      }

      if (!data?.error && product == null) {
        // Reset form after successful creation
        form.reset({
          name: "",
          url: "",
          description: "",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Product Name
                  <RequiredLabelIcon />
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Enter product name"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Website URL
                  <RequiredLabelIcon />
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="https://example.com/product"
                    disabled={isSubmitting}
                    type="url"
                  />
                </FormControl>
                <FormDescription>
                  Include the protocol (http/https) and the full path to the
                  sales page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea 
                  className="min-h-20 resize-none" 
                  placeholder="Enter product description (optional)"
                  disabled={isSubmitting}
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                An optional description to help distinguish your product from
                other products
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="self-end">
          <Button 
            disabled={isSubmitting} 
            type="submit"
            size="lg"
            className="min-w-[100px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
