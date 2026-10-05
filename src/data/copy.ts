/** Site copy. Legal and FAQ text are drafted placeholders: client to provide final copy. */

export const PHOTO_AUTH_SENTENCE =
  'I own these photos or have permission to use them, and I authorize RentABeachCondo.com to display them.';

export const faq = {
  travelers: [
    { id: 'how-book', q: 'How do I book a condo?', a: 'Every listing is managed by its owner. Send the owner a message with your dates using Contact Owner, or follow their own booking link if they have provided one. You confirm details and pay the owner directly.' },
    { id: 'fees', q: 'Does RentABeachCondo charge booking fees?', a: 'No. We are a directory, not a booking agency. We do not add service fees, and we never take payment from travelers.' },
    { id: 'rates', q: 'Are the rates shown final?', a: 'Rates are a "from" range set by each owner. Exact pricing depends on your dates and is confirmed directly with the owner.' },
    { id: 'reply', q: 'How quickly do owners reply?', a: 'Most owners reply within a day, and many within a few hours. Each listing shows the owner’s typical response time.' },
    { id: 'verified', q: 'How are listings reviewed?', a: 'We review every listing by hand before it goes live, checking photos, details, and that the owner is the owner of record or authorized to rent the unit.' },
    { id: 'pets', q: 'Can I find pet-friendly condos?', a: 'Yes. Use the Pet friendly filter on the Browse page. Pet policies and any fees are set by the owner and listed under House notes.' },
    { id: 'cancel', q: 'What about cancellations and deposits?', a: 'Cancellation terms and deposits are set by each owner. Ask the owner for their policy before you book.' },
    { id: 'report', q: 'How do I report a problem with a listing?', a: 'Use the Contact page and choose Report a listing. We read every report and follow up with the owner.' },
  ],
  owners: [
    { id: 'offer', q: 'What is the founding owner offer?', a: 'The first 25 approved owners list free for six months. No card is required to apply, and nothing is charged during the trial.' },
    { id: 'after', q: 'What happens after six months?', a: 'Before your trial ends, we will share simple annual pricing with you. You decide whether to continue. If you do not, your listing is simply unpublished.' },
    { id: 'bookings', q: 'Do you take a commission on bookings?', a: 'No. Travelers contact you directly and you keep every booking. We never process reservations or payments.' },
    { id: 'requirements', q: 'What do I need to apply?', a: 'You must be the owner of record or authorized to rent the unit, provide at least 6 photos you own or have permission to use, and describe the condo accurately.' },
    { id: 'photos-policy', q: 'Who owns the photos I upload?', a: 'You keep ownership of your photos. By uploading, you authorize RentABeachCondo.com to display them on your listing and in search results. See the Photo authorization page.' },
    { id: 'review-time', q: 'How long does review take?', a: 'Usually within two business days. We email you if anything needs a change before going live.' },
    { id: 'edit', q: 'Can I update my listing later?', a: 'Yes. Email us any changes to rates, photos, or details and we will update your listing, usually the same day.' },
    { id: 'link', q: 'Can I link to Airbnb, VRBO, or my own site?', a: 'Yes. You can add an external booking link. Travelers see a short notice before leaving our site.' },
  ],
};

export interface LegalDoc {
  slug: 'owners' | 'photos' | 'site';
  title: string;
  updated: string;
  sections: { id: string; title: string; body: string[] }[];
}

export const legal: Record<LegalDoc['slug'], LegalDoc> = {
  owners: {
    slug: 'owners', title: 'Owner terms', updated: 'October 1, 2026',
    sections: [
      { id: 'eligibility', title: 'Eligibility', body: ['You must be the owner of record of the listed condo, or hold written authorization from the owner to market it for rent.', 'You must comply with local short-term rental rules and any homeowner association requirements that apply to your building.'] },
      { id: 'listing-accuracy', title: 'Listing accuracy', body: ['You agree to describe your condo accurately, including bedrooms, bathrooms, sleeping arrangements, amenities, and view.', 'You agree to keep your listing current and to tell us promptly about any material change.'] },
      { id: 'inquiries', title: 'Responding to inquiries', body: ['Travelers contact you directly through your listing. You agree to respond to inquiries in good faith and in a reasonable time.', 'All reservations, payments, deposits, and cancellations are handled between you and the traveler. RentABeachCondo.com is not a party to any rental agreement.'] },
      { id: 'founding-offer', title: 'Founding owner offer', body: ['The first 25 approved owners receive a complimentary listing for six months from the date their listing goes live.', 'Before the complimentary period ends, we will share pricing for continuing. No charge is made without your agreement.'] },
      { id: 'review-removal', title: 'Review and removal', body: ['We review every listing before publication and may request changes or decline a listing.', 'We may unpublish a listing that is inaccurate, receives credible complaints, or does not comply with these terms.'] },
      { id: 'changes', title: 'Changes to these terms', body: ['We may update these terms. We will notify listed owners by email before material changes take effect.'] },
    ],
  },
  photos: {
    slug: 'photos', title: 'Photo authorization', updated: 'October 1, 2026',
    sections: [
      { id: 'statement', title: 'The authorization you give', body: ['When you submit photos with your application, you confirm the following statement:', `“${PHOTO_AUTH_SENTENCE}”`] },
      { id: 'ownership', title: 'Ownership', body: ['You keep all ownership of your photos. This authorization is not a transfer of copyright.'] },
      { id: 'use', title: 'How we use your photos', body: ['We display your photos on your listing page, in search results, on area and building pages, and in previews of your listing.', 'We may resize, crop, or compress photos for performance. We do not alter their content.'] },
      { id: 'removal', title: 'Removing photos', body: ['You may ask us to remove any photo at any time. If your listing is unpublished, its photos are removed from public pages.'] },
      { id: 'requirements', title: 'Photo requirements', body: ['Between 6 and 25 photos, JPG or PNG, up to 10MB each. Photos should show your actual unit and building, without watermarks or contact details.'] },
    ],
  },
  site: {
    slug: 'site', title: 'Site terms and privacy', updated: 'October 1, 2026',
    sections: [
      { id: 'directory', title: 'A directory, not an agency', body: ['RentABeachCondo.com lists condos offered by independent owners. We do not own, manage, or rent any property, and we do not process bookings or payments.'] },
      { id: 'information', title: 'Information you share', body: ['When you send an inquiry, we pass your name, email, optional phone number, dates, and message to the owner of that listing so they can reply.', 'We keep a record of inquiries to confirm delivery and to help resolve problems.'] },
      { id: 'cookies', title: 'Cookies', body: ['We use only the cookies needed to run the site and understand basic, anonymous usage.'] },
      { id: 'contact', title: 'Contact', body: ['Questions about these terms can be sent through our Contact page.'] },
    ],
  },
};

export const emailTemplates = {
  inquiry: { subject: 'New inquiry for {listing}', intro: 'You have a new message from a traveler on RentABeachCondo.com. Reply directly to this email to respond.' },
  approval: { subject: 'Your listing is live: {listing}', intro: 'Good news. Your listing has been approved and is now live on RentABeachCondo.com. Your six-month founding period starts today.' },
  changes: { subject: 'A quick change before we publish {listing}', intro: 'Thanks for applying. Before we publish your listing, we need one or two small changes.' },
};
