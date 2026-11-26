function valorVenta(venta) { return venta.cantidad * venta.precio; }
function totalVendido(ventas) { let total=0; for (const venta of ventas) total += valorVenta(venta); return total; }
function totalVendidoM(ventas) { return ventas.reduce((total, venta) => total + valorVenta(venta), 0); }
function unidadesVendidas(ventas) { let unidades=0; for (const venta of ventas) unidades += venta.cantidad; return unidades; }
function unidadesVendidasM(ventas) { return ventas.reduce((total, venta) => total + venta.cantidad, 0); }
function ventaMayor(ventas) {
    let mayor=null;
    for (const venta of ventas) {
        if (venta.cantidad > 0 && (mayor === null || valorVenta(venta) > valorVenta(mayor))) mayor=venta;
    }
    return mayor;
}
function ticketPromedio(ventas) {
    let total=0, cantidadVentas=0;
    for (const venta of ventas) if (venta.cantidad > 0) { total += valorVenta(venta); cantidadVentas++; }
    if (cantidadVentas===0) return null;
    return total/cantidadVentas;
}
function ventasPorCiudad(ventas, ciudad) {
    let total=0; const ciudadBuscada=ciudad.trim().toLowerCase();
    for (const venta of ventas) if (venta.ciudad.trim().toLowerCase()===ciudadBuscada) total += valorVenta(venta);
    return total;
}
function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada=ciudad.trim().toLowerCase();
    return ventas.filter(venta=>venta.ciudad.trim().toLowerCase()===ciudadBuscada).reduce((total,venta)=>total+valorVenta(venta),0);
}
function totalPorCiudad(ventas) {
    return ventas.reduce((acumulador,venta)=>{
        const ciudad=venta.ciudad.trim().toLowerCase();
        if (acumulador[ciudad]===undefined) acumulador[ciudad]=0;
        acumulador[ciudad]+=valorVenta(venta); return acumulador;
    },{});
}
function unidadesPorProducto(ventas) {
    return ventas.reduce((acumulador,venta)=>{
        const producto=venta.producto.trim();
        if (acumulador[producto]===undefined) acumulador[producto]=0;
        acumulador[producto]+=venta.cantidad; return acumulador;
    },{});
}
function topProductosPorValor(ventas,k) {
    const totales=ventas.reduce((acumulador,venta)=>{
        const producto=venta.producto.trim();
        if (acumulador[producto]===undefined) acumulador[producto]=0;
        acumulador[producto]+=valorVenta(venta); return acumulador;
    },{});
    return Object.entries(totales).sort((a,b)=>b[1]-a[1]).slice(0,k).map(([producto,total])=>({producto,total}));
}
function ventasDelDia(ventas,fecha) { return ventas.filter(venta=>venta.fecha===fecha); }


// Suma las ventas de una ciudad usando métodos encadenados de arrays.
function totalCiudadCadena(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .map(venta => ({
            ciudad: venta.ciudad.trim().toLowerCase(),
            valor: valorVenta(venta)
        }))
        .filter(venta => venta.ciudad === ciudadBuscada)
        .map(venta => venta.valor)
        .reduce((total, valor) => total + valor, 0);
}

// Suma las ventas de una ciudad en un solo recorrido y sin arreglos intermedios.
function totalCiudadUnaPasada(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();
    let total = 0;

    for (const venta of ventas) {
        if (venta.ciudad.trim().toLowerCase() === ciudadBuscada) {
            total += valorVenta(venta);
        }
    }

    return total;
}

// Busca clientes que aparecen en dos o más ventas.
function clientesRecurrentes(ventas) {
    const recurrentes = [];
    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {
            if (ventas[i].cliente === ventas[j].cliente &&
                !recurrentes.includes(ventas[i].cliente)) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }
    return recurrentes;
}

// Instrumentación: cada visita y cada comparación explícita cuenta como una operación.
function registrarVisita(contador) {
    contador.visitas = (contador.visitas || 0) + 1;
    contador.operaciones = (contador.operaciones || 0) + 1;
}
function registrarComparacion(contador) {
    contador.comparaciones = (contador.comparaciones || 0) + 1;
    contador.operaciones = (contador.operaciones || 0) + 1;
}
function totalVendidoInstrumentado(ventas, contador) {
    let total=0;
    for (const venta of ventas) { registrarVisita(contador); total += valorVenta(venta); }
    return total;
}
function ventaMayorInstrumentada(ventas, contador) {
    let mayor=null;
    for (const venta of ventas) {
        registrarVisita(contador);
        registrarComparacion(contador);
        const esValida=venta.cantidad>0;
        if (esValida) {
            registrarComparacion(contador);
            const esPrimeraVentaValida=mayor===null;
            if (esPrimeraVentaValida) mayor=venta;
            else {
                registrarComparacion(contador);
                if (valorVenta(venta)>valorVenta(mayor)) mayor=venta;
            }
        }
    }
    return mayor;
}
function totalPorCiudadInstrumentado(ventas, contador) {
    const acumulador={};
    for (const venta of ventas) {
        registrarVisita(contador);
        const ciudad=venta.ciudad.trim().toLowerCase();
        registrarComparacion(contador);
        if (acumulador[ciudad]===undefined) acumulador[ciudad]=0;
        acumulador[ciudad]+=valorVenta(venta);
    }
    return acumulador;
}
function primeraVentaInstrumentada(ventas, contador) {
    registrarVisita(contador);
    return ventas[0];
}

module.exports={valorVenta,totalVendido,unidadesVendidas,ventaMayor,ticketPromedio,ventasPorCiudad,totalVendidoM,unidadesVendidasM,ventasPorCiudadM,totalPorCiudad,unidadesPorProducto,topProductosPorValor,ventasDelDia,totalCiudadCadena,totalCiudadUnaPasada,clientesRecurrentes,totalVendidoInstrumentado,ventaMayorInstrumentada,totalPorCiudadInstrumentado,primeraVentaInstrumentada};
