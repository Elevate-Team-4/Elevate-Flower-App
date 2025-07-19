"use client";
import React, { useCallback } from "react";
import { ArrowLeft, ArrowRight, MapPinHouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import { Marker } from "@react-google-maps/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddDressFormType,
  addressFormSchema,
} from "@/lib/schema/address-model/address-form.schema";
import useAddAddress from "@/hooks/address/use-add-address";
import useUpdateAddress from "@/hooks/address/use-update-address";
import { useLocale, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
// types
declare global {
  interface Window {
    google: any;
  }
}
// Variables
const GOOGLE_MAPS_API_KEY = "AIzaSyA9WBTeIarf_WTg_STfDRLahYDgxLLMyRQ";

export default function AdrdessForm({
  steps,
  setSteps,
  setOpenDialog,
  address,
}: {
  steps: number;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  address?: Address;
}) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Session
  const { data: session } = useSession();

  // States
  const [center, setCenter] = useState({
    lat: Number(address?.lat) || 30.0123,
    lng: Number(address?.long) || 31.0123,
  });
  const [map, setMap] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>({
    lat: center.lat,
    lng: center.lng,
  });

  // Hooks
  const { addAddressFn, isPending } = useAddAddress();
  const { updateAddressFn, updateAddressPending } = useUpdateAddress();

  // Form
  const form = useForm<AddDressFormType>({
    defaultValues: {
      street: address?.street || "",
      phone: address?.phone || "",
      city: address?.city || "",
      lat: address?.lat || "",
      long: address?.long || "",
      username: address?.username || session?.user.firstName,
    },
    resolver: zodResolver(addressFormSchema),
  });

  // Functions
  const onLoad = useCallback(function callback(map: any) {
    setMap(map);
  }, []);
  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);
  const getCurrentLocation = () => {
    if (!map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          map.panTo(pos);
          map.setZoom(15);

          // Update both state and form
          setSelectedLocation(pos);
          form.setValue("lat", pos.lat.toString());
          form.setValue("long", pos.lng.toString());
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        },
      );
    }
  };
  const onMapClick = useCallback(
    (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      setSelectedLocation({ lat, lng });
      form.setValue("lat", lat.toString());
      form.setValue("long", lng.toString());
    },
    [form.setValue],
  );
  // Subimt handler
  const onsubmit: SubmitHandler<AddDressFormType> = (values) => {
    if (address) {
      updateAddressFn(
        { values, id: address._id },
        {
          onSuccess: () => {
            setOpenDialog(false);
            setSteps(1);
          },
        },
      );
    } else {
      addAddressFn(values, {
        onSuccess: () => {
          setOpenDialog(false);
          setSteps(1);
        },
      });
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>{t("loading-map")}</div>;
  }

  return (
    // Form
    <Form {...form}>
      <form className="space-y-2 " onSubmit={form.handleSubmit(onsubmit)}>
        {/* Step 1 form */}
        {steps === 1 && (
          <>
            <div className="border-b pb-3">
              <h3 className="font-medium text-2xl text-maroon-600 dark:text-soft-pink-300 ">
                {t("enter-address-details")}
              </h3>
            </div>
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("city")}</FormLabel>
                  {/* Field */}
                  <FormControl>
                    <Input placeholder={t("enter-your-city")} {...field} />
                  </FormControl>
                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("address")}</FormLabel>
                  {/* Field */}
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t("enter-your-full-address")}
                      className="min-h-36 resize-none"
                    />
                  </FormControl>
                  {/* FeedBack */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("phone")}</FormLabel>
                  {/* Field */}
                  <FormControl>
                    <Input {...field} placeholder={t("enter-your-phone-number")} />
                  </FormControl>
                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              className="w-full"
              onClick={async () => {
                if (await form.trigger(["city", "street", "phone"])) {
                  setSteps((prev) => prev + 1);
                }
              }}
            >
              {t("next")}
            </Button>
          </>
        )}
        {/* Step 2 form */}
        {steps === 2 && (
          <>
            <div className="border-b pb-3 flex items-center gap-4">
              <Button
                className="text-white bg-maroon-600 dark:bg-soft-pink-300 size-9 rounded-full flex items-center justify-center"
                onClick={() => setSteps((prev) => prev - 1)}
              >
                {locale === "en" ? (
                  <ArrowLeft width={20} height={20} />
                ) : (
                  <ArrowRight width={20} height={20} />
                )}
              </Button>
              <h3 className="font-medium text-2xl text-maroon-600  dark:text-soft-pink-300 ">
                {t("find-your-location")}
              </h3>
            </div>

            <div className="relative">
              {/* Google Map */}
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "400px" }}
                center={center}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={onMapClick}
                options={{
                  zoomControl: true,
                  streetViewControl: true,
                  mapTypeControl: true,
                  fullscreenControl: true,
                }}
              >
                {selectedLocation && (
                  <Marker
                    position={{
                      lat: selectedLocation.lat || center.lat,
                      lng: selectedLocation.lng || center.lng,
                    }}
                    title={`Selected Location: ${selectedLocation.lat.toFixed(
                      6,
                    )}, ${selectedLocation.lng.toFixed(6)}`}
                  />
                )}
              </GoogleMap>

              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <Button
                  variant="outline"
                  type="button"
                  onClick={getCurrentLocation}
                  className="bg-white shadow-md"
                >
                  <MapPinHouse className="w-4 h-4 mr-2" />
                  {t("find-my-location")}
                </Button>
              </div>
            </div>
            {form.formState.errors.long && (
              <p className="text-3xl font-semibold text-red-500">
                {form.formState.errors.long.message}
              </p>
            )}
            <Button
              className="w-full"
              disabled={
                isPending ||
                updateAddressPending ||
                (form.formState.isSubmitted && !form.formState.isValid)
              }
            >
              {t("add-address")}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
