import reflex as rx
from LibroHub.estado import StateLibro

@rx.page(route='/compra_libros', title='LibroHub - Comprar Libros')
def compra_libros() -> rx.Component:
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
        
        rx.center(
            rx.box(
                rx.heading("Compra de Libros", size="xl", color="teal", text_align="center"),
                rx.text("Selecciona un libro para comprar",
                    font_size="1.2em",
                    text_align="center",
                    margin_bottom="2em"
                ),
                
                # Muestra la lista de libros
                rx.foreach(
                    StateLibro.libros,
                    lambda libro: rx.box(
                        rx.hstack(
                            rx.box(
                                rx.text(f"Titulo: {libro['titulo']}", font_weight="bold", font_size="1em"),
                                rx.text(f"Autor: {libro['autor']}", font_size="1em"),
                                rx.text(f"Precio: ${libro['precio']}", font_size="1em"),
                                width="70%"
                            ),
                            rx.box(
                                rx.button(
                                    "Comprar",
                                    color_scheme="green",
                                    on_click=lambda libro=libro: StateLibro.comprar_libro(libro),
                                ),
                                width="30%",
                                text_align="right"
                            ),
                            align_items="center",
                            padding="1em",
                            border="1px solid #ccc",
                            border_radius="8px",
                            margin="0.5em 0"
                        ),
                        
                        # Mostrar el mensaje de confirmacion justo debajo del boton de compra
                        rx.cond(
                            StateLibro.libro_comprado == libro['titulo'],
                            rx.text("Compra realizada exitosamente!", color="green", font_weight="bold", margin_top="0.5em")
                        ),
                    )
                ),
                
                width="100%",
                max_width="600px",
                padding="2em",
                margin="auto"
            ),
        ),
    )
