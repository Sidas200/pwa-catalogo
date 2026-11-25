package com.utch.catalogo;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ProductoControllerTest {

	@Autowired
	private MockMvc mvc;

	@Test
	void listaProductos() throws Exception {
		mvc.perform(get("/api/productos"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.length()").value(8));
	}

	@Test
	void productoInexistenteDevuelve404() throws Exception {
		mvc.perform(get("/api/productos/999")).andExpect(status().isNotFound());
	}
}
