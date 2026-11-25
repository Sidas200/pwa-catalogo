package com.utch.catalogo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utch.catalogo.model.Producto;

/**
 * Expone el catálogo en formato JSON. El frontend (React) lo consume y lo
 * renderiza del lado del cliente (CSR); el Service Worker guarda la última
 * respuesta en caché para poder mostrarla sin conexión.
 */
@RestController
@RequestMapping("/api/productos")
public class ProductoController {

	private static final List<Producto> PRODUCTOS = List.of(
			new Producto(1, "Guadalupe Zaju", "Chiapas, México", "Lavado", "Chocolate, nuez, caramelo",
					"Cultivado a 1,400 msnm en la Sierra Madre de Chiapas. Cuerpo medio y acidez suave.", 189, "☕", "#8b5a2b"),
			new Producto(2, "Pluma Hidalgo", "Oaxaca, México", "Lavado", "Cítricos, miel, almendra",
					"Variedad típica oaxaqueña con denominación de origen. Taza limpia y brillante.", 215, "🌄", "#a0522d"),
			new Producto(3, "Coatepec", "Veracruz, México", "Honey", "Durazno, panela, cacao",
					"Proceso honey que conserva parte del mucílago para una dulzura natural.", 199, "🍑", "#c47a3d"),
			new Producto(4, "Yirgacheffe", "Etiopía", "Natural", "Frutos rojos, jazmín, té negro",
					"Origen floral por excelencia. Ideal para métodos de filtrado como V60.", 289, "🌸", "#7b3f61"),
			new Producto(5, "Huila Supremo", "Colombia", "Lavado", "Manzana roja, caramelo, vainilla",
					"Grano de tamaño supremo con acidez jugosa y final prolongado.", 245, "🍎", "#9c2f2f"),
			new Producto(6, "Tarrazú", "Costa Rica", "Lavado", "Chocolate amargo, uva, cítrico",
					"Alta montaña costarricense; cuerpo robusto y gran balance.", 265, "⛰️", "#4e6b3a"),
			new Producto(7, "Kona Blend", "Hawái, EUA", "Lavado", "Mantequilla, nuez de macadamia",
					"Mezcla con granos de las laderas volcánicas de Kona. Suave y cremoso.", 349, "🌋", "#5a4a8a"),
			new Producto(8, "Descafeinado Agua Suiza", "Chiapas, México", "Swiss Water", "Cacao, galleta, avellana",
					"Descafeinado sin químicos que conserva el sabor original del grano.", 205, "🌙", "#3d5a80"));

	@GetMapping
	public List<Producto> listar() {
		return PRODUCTOS;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Producto> obtener(@PathVariable int id) {
		return PRODUCTOS.stream()
				.filter(p -> p.id() == id)
				.findFirst()
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
}
