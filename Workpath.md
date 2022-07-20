# Cambios Siguientes

## Confirmados
- [Completo] Agregar los tipos, repos, servicios, y routes necesarios
    - Alumno
    - Curso
    - Usuario
    - Inscripcion
- [Completo] Implementar SQLite para otros Entities (Alumno, Curso, Usuario, Inscripcion)
    - ...-repo
    - ...-service
    - ...-router
- [En curso] Habilitar entidades relacionadas en las respuestas:
    - Inscripcion.Alumno/Curso/Inscrito por*
        - Probar el método .map para hacer las consultas en paralelo (pendiente)(https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop?answertab=trending#tab-top)
    - Cambiar respuestas de Repos para regresar DTO's, en lugar de Entidades
    - **Alumno.Cursos**
        - Habilitar en las otras operaciones (Add, Update, Delete) las operaciones relacionadas con los Cursos del Alumno.
- Hacer pruebas de conexión con el Front
- Habilitar todos los métodos CRUD a los distintos componentes.

### Notas:
- Se requieren relaciones entre los elementos de la BD y capacidad de probar offline, es por eso que se utliza SQLite. Se prefiere sobre MongoDB porque es relacional (con SQL) y porque no se tiene que instalar un servicio.


## Por Confirmar
- Ver si es mejor dejar con JSON o implementar con SQLite

## Completados


Referencia:
https://www.markdownguide.org/basic-syntax/