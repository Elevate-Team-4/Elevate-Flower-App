/* eslint-disable quotes */
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    formats: {
      number: {
        "currency-int": {
          style: "currency",
          currency: "EGP",
          maximumFractionDigits: 0,
          numberingSystem: locale === "ar" ? "arab" : "latn",
        },
        "currency-float": {
          style: "currency",
          currency: "EGP",
        },
        "percentage-int": {
          style: "percent",
          maximumFractionDigits: 0,
        },
        "percentage-float": {
          style: "percent",
        },
      },
      dateTime: {
        //^ --- SHORT YEAR FORMATS (year: '2-digit') ---

        //~ 09/06/25
        "short-numeric-date": {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        },

        //~ 9 Jun 25
        "short-medium-date": {
          day: "numeric",
          month: "short",
          year: "2-digit",
        },

        //~ 9 June 25
        "short-long-date": {
          day: "numeric",
          month: "long",
          year: "2-digit",
        },

        //~ 09/06/25, 14:30
        "short-numeric-date-time": {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        },

        //^ --- FULL YEAR FORMATS (year: 'numeric') ---

        //~ 09/06/2025
        "numeric-date": {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        },

        //~ 9 Jun 2025
        "medium-date": {
          day: "numeric",
          month: "short",
          year: "numeric",
        },

        //~ 9 June 2025
        "long-date": {
          day: "numeric",
          month: "long",
          year: "numeric",
        },

        //~ Monday, 9 June 2025
        "full-date": {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        },

        //~ 09/06/2025, 14:30
        "numeric-date-time": {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        },

        //~ Monday, 9 June 2025 at 2:30 PM
        "full-date-time": {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        },
      },
      list: {
        conjunction: {
          type: "conjunction",
        },
        disjunction: {
          type: "disjunction",
        },
      },
    },
  };
});
