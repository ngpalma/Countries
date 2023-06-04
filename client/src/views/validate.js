const validate = (form) => {
    let errors = {};
  
    if (form.name === "") errors.name = "Este campo no puede estar vacío";
    else if (!/^[A-Z ]+$/i.test(form.name))
      errors.name = "El nombre debe contener solo letras";
  
    if (form.difficulty === "") errors.difficulty = "Este campo no puede estar vacío";
    else if (!/^[1-5]$/.test(form.difficulty))
      errors.difficulty = "Debe ingresar un número entre 1 y 5";
  
    if (form.season === "") errors.season = "Este campo no puede estar vacío";
    else if (!/^(Verano|Otoño|Invierno|Primavera)$/.test(form.season))
      errors.season = "Puede elegir entre: Verano, Invierno, Otoño o Primavera";
  
    if (form.duration === "") errors.duration = "Este campo no puede estar vacío";
    else if (!/^[0-9]+$/.test(form.duration))
      errors.duration = "Duración en horas";
  
    if (form.countries === "")
      errors.countries = "Este campo no puede estar vacío";
  
    return errors;
  };
  
  export default validate;
  