      <body>
        {/* Aplica el tema guardado antes de hidratar el cliente */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try{
                var K='nuvion_theme';
                var t=localStorage.getItem(K)||'dark';
                var r=document.documentElement;
                r.classList.remove('theme-dark','theme-semidark','theme-light');
                if(t==='light'){ r.classList.add('theme-light'); r.dataset.theme='light'; }
                else if(t==='semi'){ r.classList.add('theme-semidark'); r.dataset.theme='semi'; }
                else { r.classList.add('theme-dark'); r.dataset.theme='dark'; }
              }catch(e){}
            })();`,
          }}
        />
        <Navbar />
        {children}
      </body>
