import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/countries";

export async function clientLoader() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    return data;
}

export default function Countries({ loaderData }: Route.ComponentProps) {
    const [search, setSearch] = useState<string>("");
    const [region, setRegion] = useState<string>("");

    const filteredCountries = loaderData.filter((country: any) => {
        const matchesRegion =
            !region || country.region.toLowerCase() === region.toLowerCase();
        const matchesSearch =
            !search ||
            country.name.common.toLowerCase().includes(search.toLowerCase());
        return matchesSearch && matchesRegion;
    });

    const NonCountry = <div> No countries match your filters. </div>
    const CountryRender = filteredCountries.map((country: any) => (
        <Link
            to={`/countries/${country.name.common}`}
            className="text-gray-100 text-lg font-semibold"
        >
            <li
                key={country.cca3}
                className="bg-[#1d1f33] border border-gray-500 rounded-xl p-4 shadow-[#232650] hover:shadow-lg transition"
            >
                {country.name.common}
                <div className="text-gray-300/80 text-sm mt-1">
                    Region: {country.region} <br />
                    Population: {country.population.toLocaleString()}
                </div>
            </li>
        </Link>
    ))

    const FilteredCountriesRender = filteredCountries.length === 0 ?
        NonCountry
        : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {CountryRender}
            </ul>
        )

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Countries</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-[#4f5494] text-white"
                />
                <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="border bg-[#1a1b26] text-white border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-[#4f5494]"
                >
                    <option value="">All Regions</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>

            {FilteredCountriesRender}
        </div>
    );
}