//! Блокировка скролла
const disableScroll = () => {

   const widthScroll = window.innerWidth - document.body.offsetWidth;

   document.querySelector('.page__header').style.left = `calc(50% - ${720 + widthScroll / 2}px)`;

   document.body.scrollPosition = window.scrollY;

   document.documentElement.style.cssText = `
      position: relative;
      height: 100vh;
   `;

   document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: -${document.body.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${widthScroll}px;
   `;
}

const enabledScroll = () => {
   document.documentElement.style.cssText = '';
   document.body.style.cssText = 'position: relative';
   document.querySelector('.page__header').style.left = `calc(50% - 720px)`;
   window.scroll({ top: document.body.scrollPosition });
}

{
   //! Модальное окно
   const presentOrderBtn = document.querySelector('.present__order-btn');
   const pageOverlayModal = document.querySelector('.page__overlay_modal');
   const modalClose = document.querySelector('.modal__close');

   const handlerModal = (openBtn, modal, openSelector, closeTrigger, sk) => {

      let opacity = 0;

      const speed = {
         slow: 15,
         medium: 8,
         fast: 1,
         default: 5,
      };

      const openModal = () => {
         disableScroll();
         modal.style.opacity = opacity;

         modal.classList.add(openSelector);

         const timer = setInterval(() => {
            opacity += 0.02;
            modal.style.opacity = opacity;
            if (opacity >= 1) clearInterval(timer);
         }, speed[sk] ? speed[sk] : speed.default);
      };

      const closeModal = () => {
         enabledScroll();
         const timer = setInterval(() => {
            opacity -= 0.02;
            modal.style.opacity = opacity;
            if (opacity <= 0) {
               clearInterval(timer);
               modal.classList.remove(openSelector);
            }
         }, speed[sk] ? speed[sk] : speed.default);

      };

      openBtn.addEventListener('click', openModal);

      closeTrigger.addEventListener('click', closeModal);

      modal.addEventListener('click', (event) => {
         if (event.target === modal) {
            closeModal();
         }
      });
   };

   handlerModal(presentOrderBtn, pageOverlayModal, 'page__overlay_modal_open', modalClose, 'slow');
}

{
   //! Бургер меню
   const headerContactsBurger = document.querySelector('.header__contacts-burger');
   const headerContacts = document.querySelector('.header__contacts');

   const handlerBurger = (openBtn, menu, openSelector) => {
      openBtn.addEventListener('click', () => {
         if (menu.classList.contains(openSelector)) {
            menu.style.height = '';
            menu.classList.remove(openSelector);
         } else {
            menu.style.height = menu.scrollHeight + 'px';
            menu.classList.add(openSelector);
         }
      })
   };

   handlerBurger(headerContactsBurger, headerContacts, 'header__contacts_open');
}