const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

// ✅ PORT corrigé pour Render
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/confirmation.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'confirmation.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route d'envoi d'e-mails
app.post('/send-email', async (req, res) => {
  const { subject, message } = req.body;

  const firstRecipient = 'kayodedaouda01@gmail.com';
  const secondRecipient = 'adelekejuso@gmail.com';

  // Transporteur pour le premier e-mail
  const transporter1 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kayodedaouda01@gmail.com',
      pass: 'hffv chqn ypah wkzu'
    }
  });

  // Transporteur pour le second e-mail
  const transporter2 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adelekejuso@gmail.com',
      pass: 'nndh nicq oxfy bbhg'
    }
  });

  try {
    // Envoi immédiat au premier destinataire
    await transporter1.sendMail({
      from: 'kayodedaouda01@gmail.com',
      to: firstRecipient,
      subject,
      text: message
    });
    console.log("E-mail envoyé immédiatement au premier destinataire.");

    // Envoi différé de 15 secondes au second destinataire
    setTimeout(async () => {
      try {
        await transporter2.sendMail({
          from: 'adelekejuso@gmail.com',
          to: secondRecipient,
          subject,
          text: message
        });
        console.log("E-mail envoyé avec délai au second destinataire.");
      } catch (error) {
        console.error("Erreur envoi second e-mail:", error);
      }
    }, 15000);

    // Redirection vers la page de confirmation
    res.redirect('/confirmation.html');
    
  } catch (error) {
    console.error("Erreur envoi premier e-mail:", error);
    res.status(500).send('Erreur lors de l\'envoi');
  }
});

// ✅ CORRECTION CRITIQUE : Port et interface d'écoute
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur actif sur le port ${PORT}`);
});
