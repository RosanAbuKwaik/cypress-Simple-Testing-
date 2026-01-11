describe('Search - nail', () => {
  const query = 'nail';

  beforeEach(() => {
    cy.visit('/', { failOnStatusCode: false });

    // تجاهل أخطاء سكربتات خارجية (ads/trackers) اللي بتكسر التست كثير
    cy.on('uncaught:exception', () => false);

    // لو فيه cookie banner شائع
    cy.get('body').then(($body) => {
      const possibleButtons = [
        'button:contains("Accept")',
        'button:contains("I agree")',
        'button:contains("Agree")',
        'button:contains("OK")',
      ];

      for (const sel of possibleButtons) {
        if ($body.find(sel).length) {
          cy.contains('button', /accept|agree|ok/i).first().click({ force: true });
          break;
        }
      }
    });
  });

  it('searches for nail and shows results', () => {
    // 1) حاول تلاقي input جاهز (لو ظاهر)
    cy.get('body').then(($body) => {
      const visibleInputSelectors = [
        'input[type="search"]:visible',
        'input[name="search"]:visible',
        'input[placeholder*="Search"]:visible',
        'input[id*="search"]:visible',
        'input[class*="search"]:visible',
      ].join(', ');

      if ($body.find(visibleInputSelectors).length) {
        cy.get(visibleInputSelectors).first().clear().type(`${query}{enter}`);
        return;
      }

      // 2) لو input مخفي: افتح search من أي زر/أيقونة
      const openSearchSelectors = [
        '[data-testid*="search"]',
        '[aria-label*="search"]',
        'button[class*="search"]',
        'a[class*="search"]',
        'button:contains("Search")',
      ];

      let clicked = false;
      for (const sel of openSearchSelectors) {
        if ($body.find(sel).length) {
          cy.get(sel).first().click({ force: true });
          clicked = true;
          break;
        }
      }

      // 3) بعد الفتح لازم يظهر input
      if (clicked) {
        cy.get(
          'input[type="search"], input[name="search"], input[placeholder*="Search"], input[class*="search"]',
          { timeout: 20000 }
        )
          .filter(':visible')
          .first()
          .should('be.visible')
          .clear()
          .type(`${query}{enter}`);
      } else {
        throw new Error('Could not find a way to open the search box (no search trigger found).');
      }
    });

    // تحقق قوي بعد البحث
    cy.url({ timeout: 20000 }).should('match', /nail|query|search|keyword/i);

    // (اختياري) تأكد في صفحة النتائج فيه أي شيء منطقي
    cy.get('body', { timeout: 20000 }).should('contain.text', query);
  });
});
