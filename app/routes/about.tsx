export default function About() {
    return (
        <div className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-extrabold  mb-6 text-center">
                    About This Website
                </h1>
                <p className="text-xl leading-relaxed mb-4">
                    This website uses the {" "}
                    <span className="font-semibold text-[#3a55cc]">
                        REST Countries API
                    </span> {" "}
                    to display comprehensive information about countries from around the
                    world.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                    Explore our data to learn about country names, capitals, regions,
                    populations, flags, and much more. Whether you’re curious about a
                    particular country or looking for insights about global regions, our
                    interactive explorer makes it easy.
                </p>
                <p className="text-lg leading-relaxed">
                    Our goal is to build a fully responsive and modern web application
                    using the latest technologies, including React Router v7 for seamless
                    routing and Tailwind CSS for a beautiful, responsive user interface.
                </p>
            </div>
        </div>
    )
}