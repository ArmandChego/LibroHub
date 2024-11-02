import reflex as rx
from LibroHub.estado import StateLibro  # Importamos el estado desde estado.py

# Pagina para agregar libros
@rx.page(route='/agregar_libro', title='Agregar Libros')
def agregar_libro() -> rx.Component:
    return rx.fragment(
        # Navbar con enlaces a cada pagina
        rx.box(
            rx.hstack(
                rx.text("LibroHub", font_size="2em", font_weight="bold", color="white"),
                rx.link("Inicio", href="/", font_size="1em", font_weight="bold", padding="1em", color="white"),
                rx.link("Comprar Libros", href="/compra_libros", font_size="1em", font_weight="bold", padding="1em", color="white"),
                rx.link("Lista de Libros", href="/libros", font_size="1em", font_weight="bold", padding="1em", color="white"),
                rx.link("Agregar Libro", href="/agregar_libro", font_size="1em", font_weight="bold", padding="1em", color="white"),
                spacing="2em",
            ),
            padding="1em",
            background_color="teal",
            width="100%",
            text_align="center"
        ),
        
        # Contenedor principal centrado vertical y horizontalmente
        rx.center(
            rx.box(
                # Encabezado de la pagina
                rx.heading('Agregar Nuevo Libro', size='lg', color="teal", text_align="center"),
                rx.text(
                    'En esta pagina podras agregar nuevos libros', 
                    font_size="1.2em", 
                    margin_bottom="1em", 
                    text_align="center"
                ),

                # Formulario para agregar libros
                rx.text('Ingrese el Titulo del libro:', font_size="1em"),
                rx.input(
                    value=StateLibro.titulo, 
                    placeholder="Titulo",
                    on_change=lambda e: StateLibro.set_titulo(e),
                    width="100%",
                    padding="0.5em",
                    margin_bottom="0.5em"
                ),
                
                rx.text('Ingrese el Autor del libro:', font_size="1em"),
                rx.input(
                    value=StateLibro.autor, 
                    placeholder="Autor",
                    on_change=lambda e: StateLibro.set_autor(e),
                    width="100%",
                    padding="0.5em",
                    margin_bottom="0.5em"
                ),
                
                rx.text('Ingrese el Precio del libro:', font_size="1em"),
                rx.input(
                    value=StateLibro.precio, 
                    placeholder="Precio",
                    on_change=lambda e: StateLibro.set_precio(e),
                    width="100%",
                    padding="0.5em",
                    margin_bottom="1em"
                ),
                
                # Boton condicional para "Agregar" o "Guardar Cambios" usando rx.cond
                rx.cond(
                    StateLibro.libro_actual,
                    rx.button(
                        "Guardar Cambios",
                        color_scheme="green",
                        on_click=StateLibro.guardar_edicion,
                        margin_bottom="2em"
                    ),
                    rx.button(
                        "Agregar Libro",
                        color_scheme="green",
                        on_click=StateLibro.agregar_libros,
                        margin_bottom="2em"
                    )
                ),
                
                # Boton para ver la lista de libros
                rx.center(
                    rx.button(
                        "Ver Libros",
                        color_scheme="green",
                        margin_top="2em",
                        on_click=rx.redirect("/libros")
                    ),
                ),
                
                width="100%",
                max_width="600px",
                padding="2em",
                margin="auto"
            ),
        ),
    )
