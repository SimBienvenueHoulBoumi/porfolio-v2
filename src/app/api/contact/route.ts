import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs requis doivent être remplis" },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // TODO: Intégrer un service d'email ici (Resend, SendGrid, Nodemailer, etc.)
    // Pour l'instant, on simule un envoi réussi
    // Exemple avec Resend (à décommenter et configurer) :
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Portfolio <contact@votredomaine.com>',
      to: 'houlboumi.sim.bienvenue@gmail.com',
      subject: subject || `Contact depuis le portfolio - ${name}`,
      html: `
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject || 'Aucun sujet'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    */

    // Log pour développement (à retirer en production)
    console.log("Contact form submission:", { name, email, subject, message });

    return NextResponse.json(
      { 
        success: true, 
        message: "Votre message a été envoyé avec succès. Je vous répondrai bientôt !" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

