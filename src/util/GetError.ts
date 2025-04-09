export interface ErrorResponse {
  response?: {
    data: {
      message?: string;
    };
  };
  message?: string;
  toString?: () => string;
}

export function getErrorMessage(error: ErrorResponse): string {
  const msg =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString?.() || // Usamos optional chaining para evitar errores si toString no está definido.
    "An unknown error occurred"; // Valor por defecto en caso de que no se encuentre un mensaje.
  return msg;
}
