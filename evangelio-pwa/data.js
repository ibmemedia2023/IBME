// Datos y contenidos de la aplicación evangelística segmentada por edades
const APP_DATA = {
  // =========================================================================
  // SECCIÓN 1: NIÑOS (4 a 10 años) - La Aventura de los Colores
  // =========================================================================
  kids: {
    title: "La Aventura de los Colores",
    subtitle: "Descubre el camino de Dios a través de los 5 colores mágicos",
    stages: [
      {
        id: "oro",
        colorName: "Oro",
        colorHex: "#fbbf24",
        bgGradient: "linear-gradient(135deg, #78350f 0%, #d97706 50%, #fef3c7 100%)",
        concept: "El Cielo y la Perfección de Dios",
        audioText: "¡Dios creó todo perfecto! Su hogar, el Cielo, es un lugar de luz y amor donde Él nos espera.",
        instruction: "¡Arrastra las 3 estrellas apagadas hacia la corona del cielo para encender su luz!",
        verse: {
          ref: "Juan 14:2 (RVC)",
          text: "En la casa de mi Padre muchas moradas hay; si así no fuera, yo os lo hubiera dicho; voy, pues, a preparar lugar para vosotros."
        }
      },
      {
        id: "negro",
        colorName: "Negro",
        colorHex: "#1e293b",
        bgGradient: "linear-gradient(135deg, #090d16 0%, #111827 70%, #000000 100%)",
        concept: "El Pecado y la Separación",
        audioText: "A veces desobedecemos a Dios. Eso se llama pecado, y nos separa de Su luz, dejándonos perdidos.",
        instruction: "Toca la pantalla para guiar al personaje por el laberinto oscuro. ¡Cuidado con los muros invisibles!",
        verse: {
          ref: "Romanos 3:23 (RVC)",
          text: "por cuanto todos pecaron, y están destituidos de la gloria de Dios"
        }
      },
      {
        id: "rojo",
        colorName: "Rojo",
        colorHex: "#ef4444",
        bgGradient: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #fca5a5 100%)",
        concept: "La Sangre de Jesús",
        audioText: "¡Pero hay buenas noticias! Jesús murió en la cruz en tu lugar. Su sangre pagó por todo tu pecado y rompió las cadenas.",
        instruction: "¡Toca rápidamente la cruz roja brillante para romper las cadenas oscuras!",
        requiredTaps: 5,
        verse: {
          ref: "Romanos 5:8 (RVC)",
          text: "Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros."
        }
      },
      {
        id: "blanco",
        colorName: "Blanco",
        colorHex: "#f8fafc",
        bgGradient: "linear-gradient(135deg, #334155 0%, #94a3b8 50%, #ffffff 100%)",
        concept: "La Limpieza y el Perdón",
        audioText: "Cuando le pides perdón a Jesús, Él te limpia por completo. ¡Ya no hay mancha en tu corazón!",
        instruction: "Usa tu dedo como una esponja y frota la mancha negra hasta dejarla totalmente limpia y blanca.",
        verse: {
          ref: "Isaías 1:18 (RVC)",
          text: "Venid luego, dice Jehová, y estemos a cuenta: si vuestros pecados fueren como la grana, como la nieve serán emblanquecidos..."
        }
      },
      {
        id: "verde",
        colorName: "Verde",
        colorHex: "#10b981",
        bgGradient: "linear-gradient(135deg, #064e3b 0%, #059669 50%, #a7f3d0 100%)",
        concept: "La Nueva Vida en Cristo",
        audioText: "Ahora que eres limpio, Jesús te da una nueva vida. Si le sigues, crecerás fuerte y darás frutos para Dios.",
        instruction: "Arrastra la regadera sobre la semilla para darle agua y verla florecer en un árbol frondoso.",
        verse: {
          ref: "Juan 10:10 (RVC)",
          text: "Yo he venido para que tengan vida, y para que la tengan en abundancia."
        }
      }
    ]
  },

  // =========================================================================
  // SECCIÓN 2: JÓVENES (12 a 18 años) - Conexión Real: Desbloquea la Verdad
  // =========================================================================
  youth: {
    title: "Conexión Real",
    subtitle: "Desbloquea la Verdad sin filtros ni mitos",
    topics: [
      {
        id: "ciencia-fe",
        title: "Tema 1: Ciencia vs. Fe",
        badge: "Apologética & Razón",
        cardQuestion: "¿Crees que la ciencia y la fe son enemigas?",
        swipeLeftText: "SÍ, son rivales",
        swipeRightText: "NO, se complementan",
        chatFlow: {
          left: {
            userReply: "Sí, siempre nos dicen que no se pueden mezclar.",
            botReply: "Es un error común. La ciencia estudia cómo funciona el universo, pero la fe responde por qué existe y quién lo creó. No compiten; se complementan.",
            insight: "Johannes Kepler, Isaac Newton y Pascal eran creyentes devotos. Para ellos, hacer ciencia era 'pensar los pensamientos de Dios después de Él'."
          },
          right: {
            userReply: "No, creo que pueden convivir perfectamente.",
            botReply: "¡Exacto! La ciencia explora la obra, y la fe conoce al Autor. Un científico cristiano estudia con admiración los pensamientos de Dios.",
            insight: "Las leyes del universo no salieron de la nada; revelan un Diseñador supremo que sostiene todo."
          }
        },
        verse: {
          ref: "Hebreos 11:3 (RVC)",
          text: "Por la fe entendemos haber sido constituido el universo por la palabra de Dios, de modo que lo que se ve fue hecho de lo que no se veía."
        }
      },
      {
        id: "identidad-sexualidad",
        title: "Tema 2: Sexualidad e Identidad",
        badge: "Identidad & Diseño",
        avatarDilemma: "El mundo dice que mi identidad y mi género los definen mis sentimientos y deseos. Si cambio, ¿estoy mintiendo?",
        options: [
          {
            key: "A",
            text: "Sí, debo seguir lo que siento.",
            botReply: "Los sentimientos cambian como el clima. Si tu identidad se basa en ellos, vivirás en constante ansiedad e inestabilidad.",
            explanation: "Cuando construyes quién eres sobre emociones pasajeras, cualquier tormenta te derrumba. Tu valor no depende de tus impulsos de hoy."
          },
          {
            key: "B",
            text: "Mi identidad viene de mi Creador.",
            botReply: "¡Correcto! Dios no te hizo por accidente. Tu cuerpo no es un accidente biológico, es un diseño intencional. La verdadera libertad no es hacer lo que quieras, sino ser quien Dios diseñó que fueras.",
            explanation: "Dios te formó con propósito eterno. No necesitas encajar en las modas de las redes sociales para tener valor infinito."
          }
        ],
        verse: {
          ref: "1 Corintios 6:19-20 (RVC)",
          text: "¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros, el cual tenéis de Dios, y que no sois vuestros? Porque habéis sido comprados por precio; glorificad, pues, a Dios en vuestro cuerpo y en vuestro espíritu, los cuales son de Dios."
        }
      }
    ]
  },

  // =========================================================================
  // SECCIÓN 3: ADULTOS (18+ años) - El Plan Eterno: Lógica y Gracia
  // =========================================================================
  adults: {
    title: "El Plan Eterno",
    subtitle: "Lógica, Soteriología y Gracia: El Camino Romano del Puente de Vida",
    steps: [
      {
        stepNumber: 1,
        title: "El Problema Universal (El Pecado)",
        draggableBlock: "La Realidad Humana",
        blockDescription: "Arrastra este bloque hacia la pantalla para examinar el estado de nuestra naturaleza.",
        screenText: "Todos hemos fallado. No existe el 'suficientemente bueno' ante un Dios infinitamente santo.",
        explanation: "La santidad de Dios es absoluta. Nuestras mejores obras no pueden compensar la ruptura de Su ley moral.",
        verse: {
          ref: "Romanos 3:23 (RVC)",
          text: "por cuanto todos pecaron, y están destituidos de la gloria de Dios"
        }
      },
      {
        stepNumber: 2,
        title: "La Consecuencia Justa (La Muerte)",
        draggableBlock: "La Ley de la Cosecha",
        blockDescription: "Arrastra este bloque. Observa cómo se abre el abismo infranqueable entre Dios y el hombre.",
        screenText: "La justicia de Dios exige que el pecado sea pagado. Ninguna obra humana puede cruzar este abismo.",
        explanation: "La justicia sin castigo no es justicia. El pecado engendra separación total y condenación eterna.",
        verse: {
          ref: "Romanos 6:23a (RVC)",
          text: "Porque la paga del pecado es muerte..."
        }
      },
      {
        stepNumber: 3,
        title: "La Solución Divina (El Sacrificio de Cristo)",
        draggableBlock: "La Cruz de Cristo",
        blockDescription: "Arrastra la Cruz sobre el abismo. Observa cómo se transforma en un puente sólido.",
        screenText: "Dios no nos dejó en el abismo. Él mismo pagó la deuda en nuestro lugar.",
        explanation: "En la cruz, la justicia y el amor perfecto de Dios se besaron: Cristo asumió la condenación que merecíamos.",
        verse: {
          ref: "Romanos 5:8 (RVC)",
          text: "Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros."
        }
      },
      {
        stepNumber: 4,
        title: "La Respuesta Humana (Fe y Confesión)",
        draggableBlock: "Arrepentimiento & Fe",
        blockDescription: "Arrastra los peldaños de Arrepentimiento y Fe para construir el acceso al puente.",
        screenText: "La salvación no se gana, se recibe. Se acepta con el corazón y se confiesa con la boca.",
        explanation: "No es un logro intelectual ni un mérito moral: es confiar plenamente en lo que Jesús ya consumó.",
        verse: {
          ref: "Romanos 10:9 (RVC)",
          text: "que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo."
        }
      },
      {
        stepNumber: 5,
        title: "La Garantía Eterna (Vida Eterna)",
        interactiveAction: "Cruzar al otro lado",
        screenText: "Has pasado de muerte a vida. Tu eternidad está segura en Cristo.",
        explanation: "La salvación no es una incertidumbre; es una promesa eterna respaldada por el Dios que no miente.",
        verse: {
          ref: "Romanos 6:23b (RVC)",
          text: "...mas la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro."
        }
      }
    ],
    prayer: {
      title: "Oración de Fe y Entrega Personal",
      lead: "Puedes orar sinceramente a Dios con estas palabras para recibir hoy a Jesús como tu Salvador:",
      text: "«Señor Jesús: Reconozco que he pecado y que estoy separado de ti. Creo que moriste en la cruz en mi lugar y resucitaste para darme vida eterna. Me arrepiento de mis faltas y confieso con mi boca que tú eres mi Señor. Entro por tu gracia y recibo el regalo de la vida eterna. En el nombre de Jesús, Amén.»"
    }
  }
};
