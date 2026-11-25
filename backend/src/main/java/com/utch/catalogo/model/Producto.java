package com.utch.catalogo.model;

/** Elemento del catálogo de cafés. */
public record Producto(
		int id,
		String nombre,
		String origen,
		String proceso,
		String notas,
		String descripcion,
		double precio,
		String emoji,
		String color) {
}
