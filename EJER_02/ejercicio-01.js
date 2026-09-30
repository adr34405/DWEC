const playlist = [
    {
        titulo: "Blinding Lights",
        artista: "The Weeknd",
        duracion: 200
    },
    {
        titulo: "Shape of You",
        artista: "Ed Sheeran",
        duracion: 234
    },
    {
        titulo: "Havana",
        artista: "Camila Cabello",
        duracion: 217
    },
    {
        titulo: "Believer",
        artista: "Imagine Dragons",
        duracion: 204
    },
    {
        titulo: "Perfect",
        artista: "Ed Sheeran",
        duracion: 263
    },
    {
        titulo: "As It Was",
        artista: "Harry Styles",
        duracion: 167
    },
    {
        titulo: "Bad Guy",
        artista: "Billie Eilish",
        duracion: 194
    },
    {
        titulo: "Levitating",
        artista: "Dua Lipa",
        duracion: 203
    },
    {
        titulo: "Watermelon Sugar",
        artista: "Harry Styles",
        duracion: 174
    },
    {
        titulo: "Counting Stars",
        artista: "OneRepublic",
        duracion: 257
    }
]

playlist.forEach(function(cancion) {
    console.log(`Titulo: ${cancion.titulo} Artista: ${cancion.artista}`)
})