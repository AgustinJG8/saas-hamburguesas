export default function Success() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-green-600">¡Pago Exitoso! 🍗</h1>
            <p className="text-xl mt-4">Tu pedido de pollo está en camino.</p>
            <a href="/" className="mt-8 text-blue-500 underline">Volver al inicio</a>
        </div>
    );
}