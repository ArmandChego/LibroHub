import reflex as rx
from LibroHub.estado import StateLibro 

# Pagina de listado de libros
@rx.page(route='/libros', title='LibroHub - Lista de Libros')
def libros() -> rx.Component:
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
        
        # Contenido principal centrado
        rx.center(
            rx.box(
                # Titulo de la pagina y descripcion
                rx.heading("Lista de Libros", size="xl", color="teal", text_align="center"),
                rx.text(
                    "Aqui se muestran todos los libros disponibles",
                    font_size="1.2em",
                    text_align="center",
                    margin_bottom="2em"
                ),
                
                # Lista de libros con botones de editar y eliminar
                rx.foreach(
                    StateLibro.libros,
                    lambda libro: rx.box(
                        rx.hstack(
                            # Muestra la informacion del libro
                            rx.box(
                                rx.text(f"Titulo: {libro['titulo']}", font_weight="bold", font_size="1em"),
                                rx.text(f"Autor: {libro['autor']}", font_size="1em"),
                                rx.text(f"Precio: ${libro['precio']}", font_size="1em"),
                                width="70%"
                            ),
                            # Botones de "Editar" y "Eliminar"
                            rx.box(
                                rx.button(
                                    "Editar",
                                    color_scheme="blue",
                                    margin_right="0.5em",
                                    on_click=lambda: StateLibro.editar_libro(libro),
                                ),
                                rx.button(
                                    "Eliminar",
                                    color_scheme="red",
                                    on_click=lambda: StateLibro.eliminar_libro(libro),
                                ),
                                width="30%",
                                text_align="right"
                            ),
                            align_items="center",
                            padding="1em",
                            border="1px solid #ccc",
                            border_radius="8px",
                            margin="0.5em 0"
                        )
                    )
                ),
                
                # Boton para agregar un nuevo libro
                rx.button(
                    "Agregar Libro",
                    color_scheme="green",
                    margin_top="2em",
                    on_click=rx.redirect("/agregar_libro")
                ),
                
                width="100%",
                max_width="600px",
                padding="2em",
                margin="auto"
            ),
        ),
    )
