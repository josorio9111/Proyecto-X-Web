export const rules = {
  emailRules: [
    (value: string) => {
      if (value) return true;
      return "El correo es obligatorio.";
    },
    (value: string) => {
      if (/.+@.+\..+/.test(value)) return true;
      return "El correo no es válido.";
    },
  ],
  passwRules: [
    (value: string) => {
      if (value) return true;
      return "La contraseña es obligatoria.";
    },
    (value: string) => {
      if (value.length >= 6) return true;
      return "La contraseña debe tener 6 caracteres.";
    },
  ]
}