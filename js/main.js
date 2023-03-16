//  MODAL

const gallery = document.querySelector(".galeria");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".contenido-modal");
const modalClose = document.querySelector(".cerrar-modal");
const galleryItems = document.querySelectorAll(".galeria-item");
const totalItems = galleryItems.length;
const prevButton = document.querySelector(".modal-previo");
const nextButton = document.querySelector(".modal-siguiente");

let currentIndex = 0;

function openModal(event) {
  const modalStyle = {
    display: "inline-flex",
    position: "fixed",
    zIndex: "1",
    paddingTop: "50px",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  };
  Object.assign(modal.style, modalStyle);


  modalContent.src = event.target.src;

  currentIndex = Array.from(galleryItems).indexOf(
    event.target.closest(".galeria-item")
  );
}

function closeModal() {
  modal.style.display = "none";
}

function navigateGallery(direction) {
  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = totalItems - 1;
  } else if (currentIndex >= totalItems) {
    currentIndex = 0;
  }
  modalContent.src = galleryItems[currentIndex].querySelector("img").src;
}

galleryItems.forEach((item) => {
  item.addEventListener("click", openModal);
});

modalClose.addEventListener("click", closeModal);

prevButton.addEventListener("click", () => {
  navigateGallery(-1);
});

nextButton.addEventListener("click", () => {
  navigateGallery(1);
});

// FIN  MODAL  



// FORMULARIO 

const $form = document.querySelector("#form");
$form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const form = new FormData(this);
  const response = await fetch(this.action, {
    method: this.method,
    body: form,
    headers: {
      Accept: "application/json",
    },
  });
  if (response.ok) {
    this.reset();
    alert("Gracias por solicitar nuestros servicios, le responderemos a la brevedad");
  }
}



// Validadores del form


function validarTexto(event, input) {
  const teclaPresionada = event.key;
  const textoRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;

  if (!textoRegex.test(teclaPresionada)) {
    event.preventDefault();
    input.setCustomValidity("Solo se permiten letras y espacios");
    input.reportValidity();
  } else {
    input.setCustomValidity("");
  }
}

function quitarMensajeError(input) {
  input.setCustomValidity("");
}

function validarEmail(event, input) {
  if (event.inputType !== 'insertText') {
    return;
  }

  const email = input.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    event.preventDefault();
    input.setCustomValidity("Ingrese un correo electrónico válido");
    input.reportValidity();
  } else {
    input.setCustomValidity("");
  }
}