<template>
  <div class="cv">
    <div class="cv-header text-center mb-5">
      <h1 class="display-4 mb-3">Antonios Pavlakis MSc MBCS</h1>
      <p class="lead text-muted">Lead Developer | Critical EHS & Lone Worker Systems | PHP Backend & Security | Scalable Architecture | Team Lead</p>
    </div>

    <div class="cv-content">
      <!-- Contact -->
      <section class="contact-section mb-5">
        <div class="contact-info d-flex justify-content-center flex-wrap gap-4">
          <a href="https://www.linkedin.com/in/pavlakis" target="_blank" rel="noopener noreferrer" class="contact-link">
            <i class="bi bi-linkedin"></i> linkedin.com/in/pavlakis
          </a>
          <a href="https://pavlakis.dev" target="_blank" rel="noopener noreferrer" class="contact-link">
            <i class="bi bi-globe"></i> pavlakis.dev
          </a>
        </div>
      </section>

      <!-- Professional Experience -->
      <section class="cv-section mb-5">
        <h2 class="section-title">
          <i class="bi bi-briefcase-fill me-2"></i>
          Professional Experience
        </h2>

        <!-- Current Role Card -->
        <div class="experience-grid mb-4">
          <!-- EcoOnline Global / StaySafe - Current -->
          <div class="experience-card current-role">
            <div class="card-header-custom">
              <div class="title-badges">
                <h3 class="position-title">Lead Developer</h3>
                <span class="remote-badge">🏠 Remote</span>
              </div>
              <span class="date-badge current">Nov 2023 - Present</span>
            </div>
            <p class="company-location">
              <span class="company-name">EcoOnline Global</span>
              <span class="location">London, United Kingdom</span>
            </p>
          </div>
        </div>

        <!-- Past Positions Card with Toggle -->
        <div class="past-positions-card">
          <button
            class="toggle-button"
            @click="showPastPositions = !showPastPositions"
            type="button"
          >
            <i :class="showPastPositions ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
            Past Positions
            <span class="position-count">(14 positions)</span>
          </button>

          <transition name="slide-fade">
            <div v-show="showPastPositions" class="table-card">
              <div class="table-responsive">
                <table class="table experience-table">
                  <thead>
                    <tr>
                      <th>Position</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Lead Developer</strong>
                        <span class="remote-badge-small">🏠 Remote</span>
                      </td>
                      <td>
                        StaySafe
                        <span class="table-note">Acquired by EcoOnline Global in 2023</span>
                      </td>
                      <td>London, UK</td>
                      <td>Oct 2020 - Nov 2023</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Senior Developer</strong>
                        <span class="remote-badge-small">🏠 Remote</span>
                      </td>
                      <td>StaySafe</td>
                      <td>London, UK</td>
                      <td>Dec 2017 - Oct 2020</td>
                    </tr>
                    <tr>
                      <td><strong>Senior Software Engineer</strong></td>
                      <td>Holmes Media (UK) Ltd</td>
                      <td>Market Harborough, UK</td>
                      <td>Mar 2017 - Dec 2017</td>
                    </tr>
                    <tr>
                      <td><strong>Senior PHP Developer</strong></td>
                      <td>All Answers Ltd</td>
                      <td>Nottingham, UK</td>
                      <td>Apr 2016 - Mar 2017</td>
                    </tr>
                    <tr>
                      <td><strong>Part-time Lecturer / Supervisor</strong></td>
                      <td>De Montfort University (DMU)</td>
                      <td>Leicester, UK</td>
                      <td>Oct 2014 - Aug 2016</td>
                    </tr>
                    <tr>
                      <td><strong>Senior Developer</strong></td>
                      <td>DVO Media Ltd</td>
                      <td>Nottingham, UK</td>
                      <td>Feb 2015 - Apr 2016</td>
                    </tr>
                    <tr>
                      <td><strong>Senior Developer</strong></td>
                      <td>Twist Digital LLP</td>
                      <td>Nottingham, UK</td>
                      <td>Feb 2015 - May 2015</td>
                    </tr>
                    <tr>
                      <td><strong>Software Engineer</strong></td>
                      <td>Jadu</td>
                      <td>Leicester, UK</td>
                      <td>Feb 2013 - Jan 2015</td>
                    </tr>
                    <tr>
                      <td><strong>Head of Development</strong></td>
                      <td>Go MAD Technology Ltd</td>
                      <td>Leicester, UK</td>
                      <td>Nov 2011 - Feb 2013</td>
                    </tr>
                    <tr>
                      <td><strong>Lead Developer</strong></td>
                      <td>Go MAD Technology Ltd</td>
                      <td>Leicester, UK</td>
                      <td>Jul 2010 - Dec 2011</td>
                    </tr>
                    <tr>
                      <td><strong>Web Applications Developer</strong></td>
                      <td>Go MAD Technology Ltd</td>
                      <td>Leicester, UK</td>
                      <td>Jun 2008 - Jul 2010</td>
                    </tr>
                    <tr>
                      <td><strong>KTP Associate</strong></td>
                      <td>De Montfort University</td>
                      <td>Leicester, UK</td>
                      <td>Jun 2008 - Jul 2010</td>
                    </tr>
                    <tr>
                      <td><strong>IT & Development Manager</strong></td>
                      <td>deSciner Business Network Ltd</td>
                      <td>Leicester, UK</td>
                      <td>2007 - 2008</td>
                    </tr>
                    <tr>
                      <td><strong>Web Developer</strong></td>
                      <td>OBBeC Media Publications Ltd</td>
                      <td>Leicester, UK</td>
                      <td>2005 - 2007</td>
                    </tr>
                    <tr>
                      <td><strong>IT Support</strong></td>
                      <td>Novartis</td>
                      <td>Basel, Switzerland</td>
                      <td>2000 - 2001</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </transition>
        </div>
      </section>


      <!-- Community -->
      <section class="cv-section mb-5">
        <h2 class="section-title">
          <i class="bi bi-people-fill me-2"></i>
          Community
        </h2>

        <div class="experience-grid">
          <!-- Leicester Greek School Parents and Carers Association -->
          <div class="experience-card community-card">
            <div class="card-header-custom">
              <h3 class="position-title">Chair</h3>
              <span class="date-badge current">Sep 2024 - Present</span>
            </div>
            <p class="company-location">
              <span class="company-name">Leicester Greek School Parents and Carers Association</span>
            </p>
          </div>

          <!-- Martial Arts Instructor -->
          <div class="experience-card community-card">
            <div class="card-header-custom">
              <h3 class="position-title">Chief Instructor & Martial Arts Instructor</h3>
              <span class="date-badge current">2009 - Present</span>
            </div>
            <p class="company-location">
              <span class="company-name">
                <a href="https://leicesteraikikai.com" target="_blank" rel="noopener noreferrer" class="company-link">
                  Leicester Aikikai
                </a>
              </span>
            </p>
            <div class="description">
              <p>Fourth degree black belt, fully qualified instructor teaching since 2009.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Education -->
      <section class="cv-section mb-5">
        <h2 class="section-title">
          <i class="bi bi-mortarboard-fill me-2"></i>
          Education
        </h2>

        <div class="education-grid">
          <div class="education-card">
            <div class="education-header">
              <h3 class="degree-title">MSc, Computational Intelligence and Robotics</h3>
              <span class="education-date">2004 - 2005</span>
            </div>
            <p class="institution">De Montfort University</p>
          </div>

          <div class="education-card">
            <div class="education-header">
              <h3 class="degree-title">BSc (Hons), Computer Science</h3>
              <span class="education-date">1999 - 2004</span>
            </div>
            <p class="institution">De Montfort University</p>
          </div>
        </div>
      </section>
    </div>

    <div class="mt-5 text-center no-print">
      <RouterLink to="/" class="btn btn-outline-primary">
        <i class="bi bi-arrow-left"></i> Back to Home
      </RouterLink>
      <button class="btn btn-primary ms-2" @click="printCV">
        <i class="bi bi-printer-fill"></i> Print CV
      </button>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'Cv',
  components: {
    RouterLink
  },
  data() {
    return {
      showPastPositions: false
    }
  },
  methods: {
    printCV() {
      window.print()
    }
  }
}
</script>

<style scoped>
/* Base Styles */
.cv {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.cv-header {
  padding-bottom: 2rem;
  border-bottom: 3px solid #e9ecef;
  margin-bottom: 3rem;
}

.cv-header h1 {
  font-weight: 700;
  color: #212529;
}

.cv-header .lead {
  font-size: 1.25rem;
  color: #6c757d;
}

/* Contact Section */
.contact-section {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 2rem;
}

.contact-info {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.contact-link {
  color: #495057;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.contact-link:hover {
  color: #0d6efd;
  transform: translateY(-2px);
}

.contact-link i {
  font-size: 1.2rem;
}

/* Section Styles */
.cv-section {
  margin-top: 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 2rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid #0d6efd;
  display: flex;
  align-items: center;
}

.section-title i {
  color: #0d6efd;
}

/* Experience Grid */
.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 1.5rem;
}

/* Past Positions Card & Toggle */
.past-positions-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 1.5rem;
}

.toggle-button {
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: none;
  border-bottom: 1px solid #e9ecef;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  transition: all 0.3s ease;
  text-align: left;
}

.toggle-button:hover {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.toggle-button i {
  font-size: 1.25rem;
  color: #0d6efd;
  transition: transform 0.3s ease;
}

.position-count {
  margin-left: auto;
  font-size: 0.9rem;
  font-weight: 500;
  color: #6c757d;
}

.table-card {
  padding: 0;
}

/* Slide Fade Transition */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Experience Table */
.experience-table {
  margin: 0;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
}

.experience-table thead {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
  color: white;
}

.experience-table thead th {
  padding: 1rem;
  font-weight: 600;
  text-align: left;
  border: none;
  font-size: 0.95rem;
  letter-spacing: 0.025em;
}

.experience-table tbody tr {
  border-bottom: 1px solid #e9ecef;
  transition: background-color 0.2s ease;
}

.experience-table tbody tr:last-child {
  border-bottom: none;
}

.experience-table tbody tr:hover {
  background-color: #f8f9fa;
}

.experience-table tbody td {
  padding: 1rem;
  vertical-align: top;
  font-size: 0.9rem;
}

.experience-table tbody td:first-child {
  min-width: 220px;
}

.experience-table tbody td:nth-child(2) {
  min-width: 200px;
}

.experience-table tbody td:nth-child(3) {
  min-width: 140px;
}

.experience-table tbody td:nth-child(4) {
  min-width: 160px;
  white-space: nowrap;
}

.remote-badge-small {
  display: inline-block;
  padding: 0.125rem 0.375rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 600;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.table-note {
  display: block;
  font-size: 0.8rem;
  color: #6c757d;
  font-style: italic;
  margin-top: 0.25rem;
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.experience-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.experience-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #0d6efd, #0a58ca);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.experience-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
  border-color: #0d6efd;
}

.experience-card:hover::before {
  opacity: 1;
}

.current-role {
  border: 2px solid #0d6efd;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
}

.current-role::before {
  opacity: 1;
  width: 5px;
}

.community-card::before {
  background: linear-gradient(to bottom, #198754, #146c43);
}

.community-card:hover {
  border-color: #198754;
}

.community-card:hover::before {
  opacity: 1;
}

.card-header-custom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.title-badges {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  flex: 1;
  min-width: 200px;
}

.position-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
  margin: 0;
}

.remote-badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
  letter-spacing: 0.025em;
}

.date-badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #495057;
  white-space: nowrap;
}

.date-badge.current {
  background: #d1e7dd;
  border-color: #198754;
  color: #146c43;
  font-weight: 600;
}

.date-badge.current::after {
  content: ' 🟢';
  font-size: 0.7rem;
}

.company-location {
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.company-name {
  font-size: 1rem;
  font-weight: 600;
  color: #495057;
}

.company-link {
  color: #495057;
  text-decoration: none;
  transition: color 0.3s ease;
}

.company-link:hover {
  color: #0d6efd;
  text-decoration: underline;
}

.company-note {
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
  padding: 0.25rem 0;
}

.location {
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
  display: flex;
  align-items: center;
}

.location::before {
  content: '📍';
  margin-right: 0.375rem;
}

.description {
  min-height: 1.5rem;
  padding-top: 0.5rem;
  color: #495057;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Education Grid */
.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.education-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.education-card::before {
  content: '🎓';
  position: absolute;
  font-size: 8rem;
  opacity: 0.1;
  right: -1rem;
  bottom: -2rem;
}

.education-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.degree-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
  min-width: 200px;
}

.education-date {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  backdrop-filter: blur(10px);
}

.institution {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  opacity: 0.95;
}

/* Print Styles */
@media print {
  .cv {
    max-width: 100%;
  }

  .no-print,
  button,
  .btn {
    display: none !important;
  }

  .toggle-button {
    display: none !important;
  }

  .table-card {
    display: block !important;
  }

  .past-positions-card {
    box-shadow: none;
    border: 1px solid #000;
  }

  .section-title {
    color: #000;
    border-bottom-color: #000;
  }

  .experience-card,
  .education-card {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #000;
    page-break-inside: avoid;
  }

  .experience-table {
    box-shadow: none;
    border: 1px solid #000;
  }

  .experience-table thead {
    background: #000 !important;
    color: #fff !important;
  }

  .experience-table tbody tr {
    page-break-inside: avoid;
  }

  .education-card {
    background: #fff;
    color: #000;
  }

  .education-card::before {
    display: none;
  }

  .experience-card::before {
    display: none;
  }

  .experience-card:hover,
  .education-card:hover {
    transform: none;
  }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .cv {
    padding: 1rem 0.5rem;
  }

  .cv-header h1 {
    font-size: 2rem;
  }

  .cv-header .lead {
    font-size: 1rem;
  }

  .contact-info {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .experience-grid,
  .education-grid {
    grid-template-columns: 1fr;
  }

  .card-header-custom {
    flex-direction: column;
    align-items: flex-start;
  }

  .date-badge {
    align-self: flex-start;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .position-title,
  .degree-title {
    font-size: 1.1rem;
  }

  .experience-table {
    font-size: 0.85rem;
  }

  .experience-table thead th,
  .experience-table tbody td {
    padding: 0.75rem 0.5rem;
  }
}

@media (max-width: 480px) {
  .cv-header h1 {
    font-size: 1.75rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .experience-card,
  .education-card {
    padding: 1.25rem;
  }
}
</style>

