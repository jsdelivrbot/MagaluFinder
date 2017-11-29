# MagaluFinder
Aplicação para informar o cliente qual loja mais próxima tem o produto desejado.

Sistema publicado:
https://magalufinder.herokuapp.com

Para execução local, basta clonar o projeto em uma máquina com NODEJS e na pasta executar o NPM INSTALL;
Após isso, executar o comando "node index" ou "nodemon index";

O sistema está com o banco de dados SQL online.

--------------------------------------------------------  Funcionamento:   --------------------------------------------------------------
----Para o cliente:
Basta o cliente permitir acesso a localização, e buscar o item desejado. Ao encontrá-lo e clicar para exibi-lo, já é exibido as lojas que estão no raio próximo de 100km ordenado por distância; além da distancia, é exibido a descrição da loja e endereço da mesma.

----Para administração:
Basta clicar no link que esta no topo da página(ADM) ou entrar no '/login'.

-Gestor de Lojas
Ao logar como "Gestor de Lojas", é possivel fazer a alteração, inserção ou remoção dos seguintes:
Usuário: Pode-se adicionar usuario "Gestor de Lojas" para administrar, ou "Gestor de Produtos" informando a filial que será responsavel para gerenciar produto filial. Nesse caso, ao adicionar usuário só é exibido as filiais existentes. Usuários são salvos na table TB_USUARIOS.
Filial: Gestor de lojas faz cadastro, remoção e alteração das filiais. Aqui, é informado dados das filiais e ao informar o endereço é feito uma requisição para o GOOGLE Api as cordenadas da loja de acordo com o endereço digitado; essas informações são salvas na tabela TB_FILIAIS.
Produtos: Os Gestor que faz o cadastro dos produtos, sendo assim, não há cadastros duplicados do mesmo.

-Gestor de Produtos
Ao Logar como "Gestor de Produtos", tem o controle total da loja que é responsável. Sendo assim, possível informar qual produto está disponível em sua loja. Ao alterar o "CheckBox", é automaticamente salvo a alteração. Essas alterações são salvas na planilha TB_LP; que salva somente a filial e código do produto.
