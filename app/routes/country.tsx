import type { Route } from "./+types/country";

export async function clientLoader({ params }: Route.LoaderArgs) {
    const countryName = params.countryName;

    const res = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    );
    const data = await res.json();
    return data;
}

export default function Country({ loaderData }: Route.ComponentProps) {
    const data = loaderData[0]
    const nonData = "N/A"

    const country = {
        name: data?.name?.common || nonData,
        officialName: data?.name?.official || nonData,
        region: data?.region || nonData,
        subregion: data?.subregion || nonData,
        capital: data?.capital || nonData,
        population: data?.population || nonData,
        flagUrl: data?.flags?.png || "",
    };
    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-[#a7b6f8]">{country.name}</h2>
                <div className="space-y-2">
                    <p>
                        <span className="font-semibold">Official Name:</span>
                        {country.officialName}
                    </p>
                    <p>
                        <span className="font-semibold">Capital:</span> {country.capital}
                    </p>
                    <p>
                        <span className="font-semibold">Region:</span> {country.region}
                    </p>
                    <p>
                        <span className="font-semibold">Subregion:</span>
                        {country.subregion}
                    </p>
                    <p>
                        <span className="font-semibold">Population:</span>
                        {country.population.toLocaleString()}
                    </p>
                </div>
            </div>
            {country.flagUrl && (
                <div className="flex justify-center items-center">
                    <img
                        src={country.flagUrl}
                        className="w-56 h-auto border rounded shadow-lg shadow-gray-700"
                    />
                </div>
            )}
        </div>
    );
}