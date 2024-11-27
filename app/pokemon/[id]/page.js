"use client";

import { useEffect, useState } from "react";

export default function PokemonPage({ params }) {
	const [pokemon, setPokemon] = useState(null);
	const [error, setError] = useState(false);
	const [id, setId] = useState(null);

	async function unwrapParams() {
		const { id } = await params;
		setId(id);
	}

	async function fetchPokemon() {
		if (!id) return;
		try {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
			const data = await res.json();
			setPokemon(data);
			console.log(data);
		} catch (error) {
			setError(error);
		}
	}

	useEffect(() => {
		fetchPokemon();
	}, [id]);

	useEffect(() => {
		unwrapParams();
	}, [params]);

	if (error) {
		return (
			<p className="text-center text-lg text-red-500">Pokémon not found.</p>
		);
	}

	if (!pokemon) {
		return <p className="text-center text-lg text-yellow-500">Loading...</p>;
	}

	return (
		<div className="text-center">
			<h1 className="text-3xl text-yellow-500 font-bold mb-4">
				{pokemon.name}
			</h1>
			{pokemon.sprites && pokemon.sprites.front_default ? (
				<img
					src={pokemon.sprites.front_default}
					alt={pokemon.name}
					className="mx-auto rounded-full border-4 border-yellow-500 mb-4"
				/>
			) : (
				<p>Image not available</p>
			)}
			<p className="text-lg">Height: {pokemon.height}</p>
			<p className="text-lg">Weight: {pokemon.weight}</p>
		</div>
	);
}
