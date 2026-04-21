Build a complete interactive web application called PFETracker — a university Final Year Project tracking platform. This is NOT just static screens. Build a fully navigable app with working sidebar navigation, clickable buttons that change states, modals that open and close, status updates that reflect visually, and realistic data throughout. Everything in French.

---

## GLOBAL APP STRUCTURE

### Layout
- Persistent left sidebar (240px wide) with logo "PFETracker" at top, nav menu items with icons, active state highlighted in blue (#1F4E79), user avatar + name + role at bottom
- Top navbar: page title (changes per page), notification bell with red badge showing count, user avatar dropdown (Profil / Déconnexion)
- Main content area: white background, 24px padding
- Color system: primary #1F4E79, accent teal #1D9E75, warning #BA7517, danger #E24B4A, success #1D9E75, gray #6B7280

### Role switcher (for demo/prototype)
- Fixed pill in top-right corner with 4 role buttons: Étudiant · Encadrant · Responsable · Directeur
- Clicking a role instantly switches the entire sidebar menu, dashboard content, and available actions to that role
- Default role on load: Étudiant

### Global interactions
- All sidebar nav items navigate to their respective page (no dead links)
- Notification bell opens a dropdown panel with 5 sample notifications, each clickable
- Clicking a notification navigates to the relevant page and closes the panel
- User avatar dropdown shows Profil and Déconnexion options
- All tables have working column sort (click header to sort asc/desc)
- All lists with more than 5 items have pagination (Previous / Next buttons)
- All destructive actions (delete, reject, break assignment) show a confirmation modal before executing
- Toast notifications appear bottom-right for 3 seconds after any action (success in green, error in red)

---

## AUTH SCREENS (shown before login)

### /login
- Centered card on gray background
- Logo + "PFETracker" title
- Email input (placeholder: votre@univ.tn), Password input with show/hide toggle
- "Se connecter" primary button — clicking navigates to dashboard based on current demo role
- "Mot de passe oublié ?" link → navigates to /forgot-password
- Error state: clicking login with empty fields shows red validation messages under each field

### /register
- Email input only + role selector (radio buttons: Étudiant / Encadrant)
- "Créer mon compte" button → shows success state: green checkmark + "Un mot de passe a été envoyé à votre adresse email"
- Link back to login

### /change-password (first login)
- Yellow warning banner at top: "Première connexion — vous devez changer votre mot de passe"
- Current password field, New password field, Confirm password field
- Password strength indicator (weak/medium/strong) updating as user types
- Submit → navigates to dashboard, banner disappears

### /forgot-password
- Email input + "Envoyer le lien" button
- After submit: success message "Si cet email existe, un lien de réinitialisation a été envoyé"

---

## ROLE: ÉTUDIANT

### Sidebar menu
Tableau de bord · Mon PFE · Tâches · Messagerie · Réunions · Profil

### /etudiant/dashboard (Tableau de bord)
TOP STAT CARDS (4 cards in a row):
- "Progression globale" — 67% with circular progress ring in teal
- "Tâches en retard" — 2 with red background and warning icon
- "Prochaine réunion" — "Dans 2 jours" with calendar icon
- "Jalon actuel" — "Développement" with milestone icon

KANBAN BOARD (below cards):
- Title: "Sprint en cours — Semaine du 13 au 20 Jan"
- 4 columns: À faire (3 cards) · En cours (2 cards) · Soumis (1 card) · Validé (4 cards)
- Each task card shows: task title, priority badge (colored), deadline date
- Drag interaction: clicking a card opens the task detail modal (same modal as in /etudiant/taches)
- Priority badge colors: Faible=gray, Normale=blue, Haute=amber, Critique=red

UPCOMING DEADLINES (right side panel):
- List of 5 upcoming deadlines sorted by date
- Overdue items shown in red with "EN RETARD" badge
- Each item: task name + deadline date + jalon name

RECENT ACTIVITY FEED (below kanban):
- 8 items with icons and timestamps: "Tâche validée par Dr. Trabelsi", "Nouveau commentaire sur Conception DB", etc.

### /etudiant/pfe (Mon PFE)
HEADER SECTION:
- PFE title: "Développement d'une plateforme e-learning avec IA"
- Two-column info: Étudiant (Ahmed Ben Salem) · Encadrant (Dr. Sonia Trabelsi) · Début (01/10/2024) · Soutenance prévue (30/06/2025)
- Global progress bar: 67% filled in teal

MILESTONE TIMELINE (vertical stepper):
- 6 milestones displayed vertically
- Milestone 1 "Définition du sujet": green checkmark, "Terminé", click to expand → shows its tasks list
- Milestone 2 "État de l'art": green checkmark, "Terminé", expandable
- Milestone 3 "Conception": amber progress ring 85%, "En cours", expanded by default showing tasks
- Milestone 4 "Développement": blue progress ring 30%, "En cours"
- Milestone 5 "Tests et validation": gray, "Non commencé"
- Milestone 6 "Rapport et soutenance": gray, "Non commencé"
- Clicking any milestone expands/collapses it showing its task list with status badges
- Each milestone shows: dates, completion %, supervisor comment (if any), livrable download button

FICHE PROJET section (collapsible):
- Shows all project fields as read-only after validation
- "Modifié le 05/10/2024 — Validé par Dr. Trabelsi"

### /etudiant/taches (Tâches)
FILTER BAR:
- Dropdown filters: Jalon (all/each), Statut (all/each), Priorité (all/each)
- Search input: "Rechercher une tâche..."
- Filters are functional — clicking them visually filters the table rows

TASKS TABLE:
- Columns: Tâche · Jalon · Priorité · Deadline · Statut · Actions
- 12 sample tasks with varied statuses and priorities
- Overdue rows have light red background
- "Validé" rows have light green background
- Actions column: "Voir" button on all rows, "Soumettre" button on "En cours" rows only

TASK DETAIL MODAL (opens on "Voir" or card click):
- Title, description, jalon, priority, deadline, assigned to
- Status badge with dropdown to change status (only allowed transitions available)
- "Changer statut → En cours" button for "Non commencé" tasks → clicking updates badge color instantly
- "Soumettre la tâche" section: comment textarea + file upload drop zone + "Soumettre" button → status changes to "Soumis", button becomes disabled, success toast appears
- Correction history accordion: shows previous submissions and supervisor feedback
- Comments thread at bottom: messages between student and supervisor about this task, text input + send button
- "Demander prolongation" button → opens sub-modal with justification textarea + new deadline picker

### /etudiant/messagerie (Messagerie)
TWO-PANEL LAYOUT:
- Left panel (300px): single conversation item "Dr. Sonia Trabelsi" with last message preview and unread count badge (2)
- Right panel: chat interface
  - Header: supervisor name, photo, "En ligne" green dot
  - Message bubbles: student messages right-aligned (blue), supervisor messages left-aligned (gray)
  - 12 sample messages with timestamps
  - "En train d'écrire..." indicator (static for prototype)
  - Bottom: text input + attachment button (paperclip icon, clicking shows file type options) + send button
  - Pressing Enter or clicking send adds a new message bubble instantly
  - File attachment: clicking paperclip opens small menu: PDF · Image · Document

COMMENTS TAB (second tab "Commentaires tâches"):
- List of 5 tasks that have comments
- Each expandable showing the comment thread
- "Ajouter un commentaire" text input at bottom of each thread

### /etudiant/reunions (Réunions)
CALENDAR VIEW:
- Monthly calendar (January 2025) with meeting markers on specific days
- Clicking a day with a meeting opens the meeting card
- "Proposer une réunion" button top-right → opens creation modal

MEETING CARDS LIST (below calendar):
- Upcoming meeting: "Bilan Conception" · 22 Jan 2025 · 10h00 · 45 min
  - Green "Rejoindre Google Meet" button (links to meet.google.com)
  - "Ordre du jour" section with bullet points
  - Status: "Confirmée"
- Past meeting: "Point d'avancement" · 08 Jan 2025
  - Shows compte-rendu text
  - "Télécharger compte-rendu" button

MEETING CREATION MODAL (on "Proposer une réunion"):
- Title input, date picker, time picker, duration dropdown (30min/45min/1h/1h30)
- Agenda textarea
- "Un lien Google Meet sera généré automatiquement" info notice in blue
- Buttons: Annuler · Proposer la réunion
- On submit: success toast "Demande de réunion envoyée à Dr. Trabelsi — lien Meet généré"

### /etudiant/profil (Profil)
- Avatar with "Changer la photo" button
- Form fields: Nom · Prénom · Téléphone (editable), Email · Département · Niveau (read-only with lock icon)
- Supervisor card: photo, name, grade, code ENC display (blurred), "Affecté le 02/10/2024"
- "Modifier" button → form fields become editable inputs, button changes to "Sauvegarder" and "Annuler"
- On save: success toast + fields return to read-only
- Change password section: current + new + confirm fields with "Changer le mot de passe" button

---

## ROLE: ENCADRANT

### Sidebar menu
Tableau de bord · Mes étudiants · Validation · Réunions · Messagerie · Profil

### /encadrant/dashboard (Tableau de bord)
STAT CARDS:
- 5 étudiants encadrés · 3 tâches à valider (amber) · 1 réunion aujourd'hui · 2 étudiants en retard (red)

STUDENTS LIST TABLE:
- Columns: Étudiant · Titre PFE · Progression · Statut · Dernière activité · Actions
- 5 students with varied progress (23%, 45%, 67%, 82%, 91%)
- Progress shown as colored bar: red <40%, amber 40-70%, green >70%
- Filter pills above: Tous · En retard · Inactifs · Sur la bonne trajectoire · Terminés — clicking filters the list
- "Voir PFE" action button navigates to that student's PFE detail

VALIDATION QUEUE (right column):
- "3 tâches en attente de validation" header with amber badge
- 3 task cards: student name + task title + submitted date + "Valider" (green) and "À corriger" (red) buttons
- Clicking "Valider" → task disappears from queue + success toast "Tâche validée"
- Clicking "À corriger" → opens correction modal with comment textarea (required) → on submit task disappears from queue

UPCOMING MEETINGS:
- Timeline of next 3 meetings with student names and Google Meet links

### /encadrant/etudiants/:id (Détail étudiant — navigates from "Voir PFE")
- Student info header + PFE info
- Same 6-milestone timeline as student view but with supervisor actions available
- Tasks table: same as student view but with Valider/À corriger action buttons
- Activity history: timeline of all actions

### /encadrant/validation (Validation)
- Full queue of all submitted tasks across all students
- Columns: Étudiant · Tâche · Jalon · Soumis le · Fichier · Actions
- "Fichier" column: "Voir fichier" link that opens a preview modal (PDF viewer mockup)
- Bulk action: checkbox + "Valider la sélection" button
- Filter by student dropdown
- Empty state when all validated: checkmark illustration + "Toutes les tâches sont validées"

### /encadrant/profil (Profil)
- Professional info: Grade · Spécialité · Bureau (editable)
- ENC CODE CARD: large prominent card with "Votre code d'invitation" label, big "ENC-A7X3K" text, copy button (clicking shows "Copié !" tooltip for 2 seconds)
- INVITATION SECTION: 
  - Email input + "Envoyer l'invitation" button
  - On submit: success toast "Invitation envoyée à ahmed@univ.tn — lien Google Meet de bienvenue généré"
  - Invitation appears in pending list below
- INVITATIONS TABLE: Email · Date · Statut (En attente/Accepté/Refusé/Expiré) · Action (Renvoyer for expired/pending)
  - "En attente" = amber badge · "Accepté" = green badge · "Refusé" = red badge · "Expiré" = gray badge
  - Clicking "Renvoyer" → badge changes to "En attente" + toast

### /encadrant/reunions (Réunions)
- Same structure as student reunions view but:
  - Shows ALL meetings for ALL students in one calendar
  - Student name shown on each meeting card
  - Encadrant can add compte-rendu after meeting: clicking "Ajouter compte-rendu" opens textarea modal
  - After saving compte-rendu: text appears in meeting card, button becomes "Modifier compte-rendu"
  - Can cancel meetings: "Annuler la réunion" button → confirmation modal → on confirm meeting card shows "Annulée" red badge + student notification toast

### /encadrant/messagerie (Messagerie)
- Left panel: list of all student conversations (5 items) with last message + unread count
- Clicking a conversation loads it in right panel
- Same chat interface as student view
- Active conversation highlighted in sidebar

---

## ROLE: RESPONSABLE DE DÉPARTEMENT

### Sidebar menu
Tableau de bord · Comptes · Affectations · Supervision · Profil

### /admin/dashboard (Tableau de bord)
STAT CARDS:
- 45 étudiants · 8 encadrants · 38 PFE actifs · 6 PFE en retard (red)

ALERT BANNER (amber, dismissible):
- "3 comptes encadrants en attente de validation" with "Valider maintenant" button → navigates to /admin/comptes tab "En attente"

CHARTS ROW:
- Donut chart (Chart.js): PFE statuses — En cours 28 (blue) · En retard 6 (red) · Terminé 4 (green) · Non démarré 8 (gray) — legend below chart
- Bar chart: progression moyenne par encadrant (5 bars)

ORPHAN STUDENTS CARD:
- "2 étudiants sans encadrant" warning card with amber border
- Names listed: "Karim Mansouri (depuis 5 jours)" · "Leila Hamdi (depuis 12 jours)"
- "Affecter manuellement" button per student → opens affectation modal

### /admin/comptes (Comptes)
THREE TABS: En attente (badge 3) · Étudiants · Encadrants

TAB "En attente":
- 3 supervisor accounts waiting validation
- Card per account: name, email, register date, department
- "Valider" green button → account disappears from list + success toast "Compte validé — email de confirmation envoyé"
- "Rejeter" red button → opens modal with required rejection reason textarea → on submit account disappears + toast

TAB "Étudiants":
- Table with columns: Nom · Email · Niveau · Encadrant affecté · Statut compte · Actions
- Status toggle: active (green pill) / inactive (gray pill) — clicking toggles with confirmation modal
- "Réinitialiser mdp" action → confirmation modal → toast "Nouveau mot de passe temporaire envoyé par email"
- Search bar filters table in real time as user types

TAB "Encadrants":
- Table: Nom · Email · Grade · Nb étudiants · Code ENC · Statut · Actions
- "Regénérer code" action → confirmation modal → code in table updates + toast

### /admin/affectations (Affectations)
AFFECTATIONS TABLE:
- Shows encadrant → list of their students as chips/badges
- Example row: "Dr. Trabelsi | Ahmed Ben Salem [chip] · Fatma Riahi [chip] · +2 autres [chip]"
- Clicking a student chip opens their PFE summary in a side panel
- "Rompre affectation" button per row → confirmation modal with reason (required) → on confirm row updates

ORPHAN SECTION (amber box at top):
- "Étudiants sans encadrant" title
- List of orphan students with "Affecter" button
- Clicking "Affecter" opens modal: dropdown "Choisir un encadrant" (shows charge: "Dr. Trabelsi — 4/5 étudiants") + "Confirmer l'affectation" button → student moves from orphan list to affectations table

CHARGE INDICATOR:
- Each encadrant row shows "4/5" capacity indicator — bar fills red when at max

### /admin/supervision (Supervision)
FILTER BAR:
- Dropdowns: Encadrant · Statut PFE · Progression (Tous / <30% / 30-70% / >70%)
- All filters work together to filter the table below

PFE TABLE:
- Columns: Étudiant · Encadrant · Titre PFE · Progression · Statut · Dernière activité · Alerte
- Rows inactive >7 days: light yellow background + "INACTIF" amber badge in Alerte column
- Rows in retard: light red background + "EN RETARD" red badge
- Progression shown as colored mini progress bar
- Clicking any row opens a side panel with PFE summary (read-only)

---

## ROLE: DIRECTEUR DES STAGES

### Sidebar menu
Vue globale · Départements · Profil

### /directeur/dashboard (Vue globale)
THREE DEPARTMENT TABS: Informatique · Réseaux · Logiciel
- Clicking each tab updates ALL charts and stats on the page

PER-DEPARTMENT STATS (update when tab changes):
- Cards: PFE actifs · Progression moyenne · Taux de retard % · Nb encadrants actifs

COMPARISON CHARTS:
- Grouped bar chart (Chart.js): 3 groups (one per dept) × 3 bars each (progression, taux retard, taux encadrement) — with legend
- Line chart: évolution mensuelle des PFE actifs (12 months, 3 colored lines, one per dept)
- Radar chart: 3 axes (Progression / Retards / Encadrement) — 3 department lines overlaid

CRITICAL ALERTS BOX:
- "Département Réseaux — 28% de PFE en retard — au-dessus du seuil critique de 20%" with red border
- Alert is dismissible (X button)

ALL DATA READ-ONLY — no action buttons anywhere except export

EXPORT BUTTON: "Exporter rapport PDF" → shows toast "Rapport en cours de génération..."

---

## KEY INTERACTIVE FLOWS (must all work end-to-end)

### Flow 1 — Student submits a task
1. Student goes to /etudiant/taches
2. Clicks "Voir" on a task with status "En cours"
3. Modal opens
4. Writes a comment in the textarea
5. Clicks "Soumettre la tâche"
6. Status badge in modal changes from "En cours" to "Soumis"
7. Success toast: "Tâche soumise — votre encadrant a été notifié"
8. Modal closes
9. Task row in table now shows "Soumis" badge (amber)
10. Notification bell badge count increases by 1

### Flow 2 — Supervisor validates a task
1. Switch to Encadrant role
2. Go to /encadrant/validation
3. Click "Valider" on a task
4. Task disappears from queue with green flash animation
5. Badge count on sidebar "Validation" decreases by 1
6. Success toast: "Tâche validée — Ahmed Ben Salem a été notifié"

### Flow 3 — Supervisor requests correction
1. In /encadrant/validation, click "À corriger"
2. Modal opens with required comment textarea
3. Textarea empty → submit button disabled
4. Type a comment → submit button enables
5. Click "Demander correction"
6. Task disappears from queue
7. Toast: "Correction demandée"

### Flow 4 — Student enters ENC code
1. Start as Étudiant with no supervisor yet (empty state on dashboard)
2. Dashboard shows: "Aucun encadrant assigné" card with "Saisir un code d'invitation" button
3. Click button → modal opens with ENC code input
4. Type "ENC-A7X3K" → input border turns green + "Code valide — Dr. Sonia Trabelsi" confirmation appears
5. Click "Rejoindre" → modal shows loading spinner for 1 second → success screen "Demande envoyée à Dr. Trabelsi"
6. Dashboard updates: supervisor card appears with "En attente de confirmation" amber badge

### Flow 5 — Schedule a meeting with auto Google Meet link
1. Go to /etudiant/reunions or /encadrant/reunions
2. Click "Proposer une réunion"
3. Fill in title, date (pick any future date), time, duration
4. Notice showing "Lien Google Meet généré automatiquement via Google Calendar"
5. Click "Proposer la réunion"
6. Modal closes
7. New meeting card appears in the list with a Google Meet link displayed as "meet.google.com/xyz-abcd-efg"
8. Toast: "Réunion proposée — lien Google Meet généré — Dr. Trabelsi a été notifié"
9. Calendar shows a dot on the selected date

### Flow 6 — Admin validates a supervisor account
1. Switch to Responsable role
2. Go to /admin/comptes (lands on "En attente" tab)
3. See 3 pending accounts
4. Click "Valider" on first account
5. Account card disappears with animation
6. Badge on tab decreases from 3 to 2
7. Toast: "Compte validé — email envoyé à m.benjmaa@univ.tn"
8. Alert banner on dashboard count decreases

### Flow 7 — Forced affectation by admin
1. In /admin/affectations, click "Affecter" next to orphan student
2. Modal opens with supervisor dropdown
3. Each option shows current load: "Dr. Trabelsi (4/5)" · "Dr. Mejri (2/5)" · "Dr. Gharbi (5/5 — COMPLET)" 
4. "COMPLET" option is disabled/grayed out
5. Select "Dr. Mejri"
6. Click "Confirmer l'affectation"
7. Modal closes
8. Student disappears from orphan list
9. Dr. Mejri's row in affectation table now shows the new student chip
10. Dr. Mejri's charge updates to "3/5"

---

## SAMPLE DATA TO USE CONSISTENTLY ACROSS ALL SCREENS

Students: Ahmed Ben Salem (67% progression) · Fatma Riahi (23%) · Youssef Hamdi (91%) · Leila Mansouri (45%) · Karim Bouzid (82%)
Supervisors: Dr. Sonia Trabelsi (4 students) · Dr. Mohamed Mejri (2 students) · Dr. Amina Gharbi (5 students — full)
Departments: Informatique · Réseaux · Logiciel
Current milestone for Ahmed: Conception (milestone 3, 85% done)
PFE title: "Développement d'une plateforme e-learning avec IA"
ENC code for Dr. Trabelsi: ENC-A7X3K
Sample meeting: "Bilan Conception" — 22 Jan 2025 10h00 — meet.google.com/abc-defg-hij
Sample overdue tasks: "Diagramme de classes" (3 days late) · "Rapport d'analyse" (1 day late)

---

## EMPTY STATES (show these when lists are empty)
- No tasks in validation queue: green checkmark + "Toutes les tâches ont été validées"
- No upcoming meetings: calendar icon + "Aucune réunion planifiée — Proposer une réunion"
- No messages: chat bubble icon + "Démarrez la conversation avec votre encadrant"
- No pending accounts: shield icon + "Aucun compte en attente de validation"
- Student with no supervisor: person+question icon + "Aucun encadrant assigné" + "Saisir un code d'invitation" button

---

## MODALS REQUIRED (all must open and close correctly)
1. Task detail modal (student + supervisor versions)
2. Correction request modal (required comment)
3. ENC code entry modal (with validation feedback)
4. Meeting creation modal (with Google Meet notice)
5. Account rejection modal (required reason)
6. Force affectation modal (supervisor dropdown with load)
7. Break affectation confirmation modal
8. Account deactivation confirmation modal
9. Password reset confirmation modal
10. File preview modal (PDF viewer placeholder)