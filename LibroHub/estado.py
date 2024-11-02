import reflex as rx
from typing import List, Dict, Optional
import asyncio

# Definicion de la estructura de la Lista Enlazada
class Nodo:
    def __init__(self, data):
        self.data = data
        self.next: Optional[Nodo] = None

class ListaEnlazada:
    def __init__(self):
        self.head: Optional[Nodo] = None
    
    def append(self, data):
        new_node = Nodo(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
    
    def remove(self, data):
        if not self.head:
            return
        if self.head.data == data:
            self.head = self.head.next
            return
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next
    
    def to_list(self) -> List[Dict[str, str]]:
        libros = []
        current = self.head
        while current:
            libros.append(current.data)
            current = current.next
        return libros

# Instancia de la lista enlazada
lista_enlazada = ListaEnlazada()

# Estado de la aplicacion
class StateLibro(rx.State):
    libros: List[Dict[str, str]] = []  # Lista de libros (convertida desde lista enlazada)
    titulo: str = ""                   # Titulo del libro
    autor: str = ""                    # Autor del libro
    precio: str = ""                   # Precio del libro
    libro_actual: Optional[Dict[str, str]] = None  # Libro que se esta editando
    libro_comprado: Optional[str] = None  # Titulo del libro que se acaba de comprar

    def agregar_libros(self):
        # Anade un libro a la lista enlazada y actualiza la lista de libros
        nuevo_libro = {
            "titulo": self.titulo,
            "autor": self.autor,
            "precio": self.precio
        }
        lista_enlazada.append(nuevo_libro)
        self.libros = lista_enlazada.to_list()
        self.titulo = self.autor = self.precio = ""  # Limpia el formulario

    def eliminar_libro(self, libro):
        # Elimina el libro de la lista enlazada y actualiza la lista de libros
        lista_enlazada.remove(libro)
        self.libros = lista_enlazada.to_list()

    def editar_libro(self, libro):
        # Carga los datos del libro en el formulario para editar
        self.libro_actual = libro
        self.titulo = libro["titulo"]
        self.autor = libro["autor"]
        self.precio = libro["precio"]

    def guardar_edicion(self):
        # Reemplaza los datos del libro actual con los datos nuevos
        if self.libro_actual:
            lista_enlazada.remove(self.libro_actual)  # Elimina el libro antiguo
            self.agregar_libros()  # Anade el libro con los datos actualizados
            self.libro_actual = None  # Limpia el estado de edicion

    async def comprar_libro(self, libro): # Mensaje de compra
        self.libro_comprado = libro['titulo']
        
        await asyncio.sleep(3)
        
        self.libro_comprado = None
