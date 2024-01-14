import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("<App/> Aplicacion Carga bien la primera vez", () => {
  // const wrapper = render(<App/>);
  // wrapper.debug();
  render(<App />);

  expect(screen.getByText("Administrador de Pacientes")).toBeInTheDocument();
  expect(screen.getByTestId("nombre-app").textContent).toBe(
    "Administrador de Pacientes"
  );
  expect(screen.getByTestId("nombre-app").tagName).toBe("H1");

  expect(screen.getByText("Crear Cita")).toBeInTheDocument();
  expect(screen.getByText("No hay citas")).toBeInTheDocument();
});

test("<App /> Aplicacion validando que al crear una cita el nombre dinamico haya cambiado", () => {
  // renderizamos la aplicacion
  render(<App />);

  // cargamos el formulario
  userEvent.type(screen.getByTestId("mascota"), "nombre de la mascota");
  userEvent.type(screen.getByTestId("propietario"), "nombre del  propietario");
  userEvent.type(screen.getByTestId("fecha"), "2020-10-10");
  userEvent.type(screen.getByTestId("hora"), "10:10");
  userEvent.type(screen.getByTestId("sintomas"), "Sintomas de la mascota");

  // simulamos el click del formulario
  const buttonSubmit = screen.getByTestId("btn-submit");
  userEvent.click(buttonSubmit);

  // compruebo que no este la alerta , la alerta puede o no existir en el documento por lo que se debe usar el query
  expect(screen.queryByTestId("alerta")).not.toBeInTheDocument();

  // compruebo que el nombre dinamico de la cita haya cambiado, indicando que si se añadio una cita nueva
  expect(screen.getByTestId("titulo-dinamico").textContent).toBe(
    "Administra tus Citas"
  );
});

test("<App /> Verificar las Citas en el DOM", async () => {
  render(<App />);

  // el metodo de findAllByTestId se puede usar cuano se queiren comprobar elementos que se iran cargando con peticiones a una api o fetch de datos
  const citas = await screen.findAllByTestId("cita");
  //  console.log(citas.toString());

  // // esto crea un archivo para verificar el contenido de lo que esta conteniendo ese elemento
  // expect(citas).toMatchSnapshot();
  expect(screen.getByTestId("btn-eliminar-cita").tagName).toBe("BUTTON");
  expect(screen.getByTestId("btn-eliminar-cita")).toBeInTheDocument();

  // verificar el contenido de alguna cita
  // buscara este texto porque fue lo que llenamos en el formulario en la linea 27
  expect(screen.getByText("nombre de la mascota")).toBeInTheDocument();
});

test("<App /> Verificar la eliminacion de una cita", () => {
  render(<App />);

  // valido que este el boton de eliminar un cita
  const btnEliminarCita = screen.getByTestId("btn-eliminar-cita");
  expect(btnEliminarCita.tagName).toBe("BUTTON");
  expect(btnEliminarCita).toBeInTheDocument();

  // simulamos el click del boton eliminar cita
  userEvent.click(btnEliminarCita);

  // comprobamos que ya no este el boton de eliminar y que ya no este el contenido de una cita
  expect(btnEliminarCita).not.toBeInTheDocument();
  expect(screen.queryByText("nombre de la mascota")).not.toBeInTheDocument();

  // compruebo que el nombre dinamico de la cita este de nuevo en "No hay citas"
  expect(screen.getByText("No hay citas")).toBeInTheDocument();
});
