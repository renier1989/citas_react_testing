import React from 'react';
import PropTypes from 'prop-types';


const Cita = ({cita, eliminarCita}) => ( 
    <div data-testid="cita" className="cita">
        <p>Mascota: <span>{cita.mascota}</span> </p>
        <p>Dueño: <span>{cita.propietario}</span> </p>
        <p>Fecha: <span>{cita.fecha}</span> </p>
        <p>Hora: <span>{cita.hora}</span> </p>
        <p>Sintomas: <span>{cita.sintomas}</span> </p>

        <button
            data-testid="btn-eliminar-cita"
            className="button eliminar u-full-width"
            onClick={ () => eliminarCita(cita.id)  }
        >Eliminar &times;</button>
    </div>
);

Cita.propTypes = {
    cita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired
}
 
export default Cita;