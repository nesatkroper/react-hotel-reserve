export const cDollar = (value = 0, percentage = 100) => {
  if (value == null || isNaN(value) || value <= 0) return "-0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value * (percentage / 100));
};

export const afterPerDollar = (value = 0, percentage = 100) => {
  if (value == null || isNaN(value) || value <= 0) return "-0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value * (1 - percentage / 100));
};

export const cRiel = (value = 0, percentage = 100) => {
  if (value == null || isNaN(value) || value <= 0) return "-0.00";
  return new Intl.NumberFormat("km-KH", {
    style: "currency",
    currency: "KHR",
  }).format(value * (percentage / 100));
};

export const afterPerRiel = (value = 0, percentage = 100) => {
  if (value == null || isNaN(value) || value <= 0) return "-0.00";
  return new Intl.NumberFormat("km-KH", {
    style: "currency",
    currency: "KHR",
  }).format(value * (1 - percentage / 100));
};

export const rielToDollar = (value = 0, rate = 4000, percentage = 100) => {
  if (value == null || isNaN(value) || value <= 0) return "-0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((value / rate) * (percentage / 100));
};
export const dollarToRiel = (value = 0, rate = 4000, percentage = 100) => {
  if (value == null || isNaN(value) || value <= 0) return "-0.00";
  return new Intl.NumberFormat("km-KH", {
    style: "currency",
    currency: "KHR",
  }).format(value * rate * (percentage / 100));
};

export const toPercentage = (value, fixed = 0) => {
  return `${value.toFixed(fixed)} %`;
};

export const toUnit = (value, fixed = 0, unit = "pcs") => {
  return `${value.toFixed(fixed)} ${unit}`;
};

export const toNumber = (last, char = "-") => {
  return parseInt(last?.split(char)[1], 10);
};

export const datetimeNow = (
  add = 0,
  hour = false,
  hour12 = false,
  lang = "en",
  zone = "kh",
  month = "s",
  year = "n"
) => {
  const options = {
    day: "2-digit",
    month: month === "s" ? "short" : month === "l" ? "long" : "2-digit",
    year: year === "n" ? "numeric" : "2-digit",
  };

  if (hour) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.hour12 = hour12;
  }

  const c = new Date();
  c.setDate(c.getDate() + add);

  return c.toLocaleDateString(`${lang}-${zone.toUpperCase()}`, options);
};
