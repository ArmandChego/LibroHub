import reflex as rx
from LibroHub.agregar_libro import StateLibro, agregar_libro  # Importa el estado y la pagina de agregar libros
from LibroHub.libros import libros  # Importa la nueva pagina de libros
from LibroHub.compra_libros import compra_libros

# Pagina de Bienvenida (Indice)
def index() -> rx.Component:
    return rx.fragment(
        # Navbar simple
        rx.box(
            rx.hstack(
                rx.text("LibroHub", font_size="2em", font_weight="bold", color="white"),
                rx.link("Inicio", href="/", font_size="1em", font_weight="bold", padding="1em", color="white"),
                rx.link("Comprar Libros", href="/compra_libros", font_size="1em", font_weight="bold", padding="1em", color="white"),
                rx.link("Lista de Libros", href="/libros",font_size="1em", font_weight="bold", padding="1em", color="white"),
                rx.link("Agregar Libro", href="/agregar_libro",font_size="1em", font_weight="bold", padding="1em", color="white"),
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
                rx.heading("Bienvenidos a LibroHub!", size="xl", color="teal", text_align="center"),
                rx.text(
                    "Explora nuestra seleccion de libros y encuentra el proximo libro que deseas leer.",
                    font_size="1.2em",
                    text_align="center",
                    margin_bottom="2em"
                ),

                # Seccion de Libros Destacados
                rx.heading("Libros Destacados", size="lg", color="teal", text_align="center", margin_bottom="1em"),
                rx.foreach(
                    StateLibro.libros,  # Usamos StateLibro.libros para obtener la lista de libros
                    lambda libro: rx.box(
                        rx.text(f"Titulo: {libro['titulo']}", font_weight="bold", font_size="1em"),
                        rx.text(f"Autor: {libro['autor']}", font_size="1em"),
                        rx.text(f"Precio: ${libro['precio']}", font_size="1em"),
                        padding="1em",
                        border="1px solid #ccc",
                        border_radius="8px",
                        margin="0.5em 0"
                    )
                ),
                width="100%",
                max_width="600px",
                padding="2em",
                margin="auto"
            ),
        ),
    )

app = rx.App()
app.add_page(index)
app.add_page(agregar_libro)
app.add_page(libros)
app.add_page(compra_libros)
