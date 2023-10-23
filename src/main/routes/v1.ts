/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import { knexClient } from '@/external/database/postgres/client';
import { Router } from 'express';

type ReceitasDatabase = {
  ano: number;
  orgao_superior: string;
  aorgao: string;
  unidade_gestora: string;
  categoria: string;
  origem: string;
  especie: string;
  detalhamento: string;
  valor_loa: string;
  valor_atualizado: string;
};

type DespesasDatabase = {
  exercicio: number;
  codigo_orgao_superior: number;
  nome_orgao_superior: string;
  codigo_orgao_subordinado: number;
  nome_orgao_subordinado: string;
  codigo_unidade_orcamentaria: number;
  nome_unidade_orcamentaria: string;
  codigo_funcao: number;
  nome_funcao: string;
  codigo_subfuncao: number;
  nome_subfuncao: string;
  codigo_programa_orcamentario: number;
  nome_programa_orcamentario: string;
  codigo_acao: string;
  nome_acao: string;
  codigo_categoria_economica: number;
  nome_categoria_economica: string;
  codigo_grupo_despesa: number;
  nome_grupo_despesa: string;
  codigo_elemento_despesa: number;
  nome_elemento_despesa: string;
  orcamento_inicial: string;
  orcamento_atualizado: string;
  orcamento_empenhado: string;
  orcamento_realizado: string;
};

export default (): Router => {
  const router = Router();

  router.get('/get-receitas-por-categoria', async (req, res) => {
    const registros = await knexClient<ReceitasDatabase>('receitas').select(
      'categoria',
      'valor_atualizado',
    );

    const somas: { [categoria: string]: number } = {};

    for (const registro of registros) {
      const valor = parseFloat(
        registro.valor_atualizado.replace('.', '').replace(',', '.'),
      );
      if (!Number.isNaN(valor)) {
        if (somas[registro.categoria]) {
          somas[registro.categoria] += valor;
        } else {
          somas[registro.categoria] = valor;
        }
      }
    }

    const resultados = Object.entries(somas).map(([categoria, total]) => {
      return { categoria, total: Math.round(total * 100) / 100 };
    });

    return res.json(resultados);
  });
  router.get('/get-receitas-por-orgao_superior', async (req, res) => {
    const registros = await knexClient<ReceitasDatabase>('receitas').select(
      'orgao_superior',
      'valor_atualizado',
    );

    const somas: { [orgao_superior: string]: number } = {};

    for (const registro of registros) {
      const valor = parseFloat(
        registro.valor_atualizado.replace('.', '').replace(',', '.'),
      );
      if (!Number.isNaN(valor)) {
        if (somas[registro.orgao_superior]) {
          somas[registro.orgao_superior] += valor;
        } else {
          somas[registro.orgao_superior] = valor;
        }
      }
    }

    const resultados = Object.entries(somas).map(([orgao_superior, total]) => {
      return { orgao_superior, total: Math.round(total * 100) / 100 };
    });

    return res.json(resultados);
  });
  router.get('/get-receitas-total', async (req, res) => {
    const registros = await knexClient('receitas')
      .select('valor_atualizado')
      .where('ano', '>=', req.body.anoInicial)
      .andWhere('ano', '<=', req.body.anoFinal);

    let total = 0;

    for (const registro of registros) {
      const valor = parseFloat(registro.valor_atualizado);
      if (!Number.isNaN(valor)) {
        total += valor;
      }
    }

    return res.json({ total: Math.round(total * 100) / 100 });
  });
  router.get('/get-despesas-por-categoria_economica', async (req, res) => {
    const registros = await knexClient<DespesasDatabase>('despesas').select(
      'nome_categoria_economica',
      'orcamento_realizado',
    );

    const somas: { [nome_categoria_economica: string]: number } = {};

    for (const registro of registros) {
      const valor = parseFloat(
        registro.orcamento_realizado.replace('.', '').replace(',', '.'),
      );
      if (!Number.isNaN(valor)) {
        if (somas[registro.nome_categoria_economica]) {
          somas[registro.nome_categoria_economica] += valor;
        } else {
          somas[registro.nome_categoria_economica] = valor;
        }
      }
    }

    const resultados = Object.entries(somas).map(
      ([nome_categoria_economica, total]) => {
        return {
          categoria_economica: nome_categoria_economica,
          total: Math.round(total * 100) / 100,
        };
      },
    );

    return res.json(resultados);
  });
  router.get('/get-despesas-por-orgao_superior', async (req, res) => {
    const registros = await knexClient<DespesasDatabase>('despesas').select(
      'nome_orgao_superior',
      'orcamento_realizado',
    );

    const somas: { [orgao_superior: string]: number } = {};

    for (const registro of registros) {
      const valor = parseFloat(
        registro.orcamento_realizado.replace('.', '').replace(',', '.'),
      );
      if (!Number.isNaN(valor)) {
        if (somas[registro.nome_orgao_superior]) {
          somas[registro.nome_orgao_superior] += valor;
        } else {
          somas[registro.nome_orgao_superior] = valor;
        }
      }
    }

    const resultados = Object.entries(somas).map(
      ([nome_orgao_superior, total]) => {
        return {
          orgao_superior: nome_orgao_superior,
          total: Math.round(total * 100) / 100,
        };
      },
    );

    return res.json(resultados);
  });
  router.get('/get-despesas-inicial-total', async (req, res) => {
    const registros = await knexClient<DespesasDatabase>('despesas')
      .select('orcamento_inicial')
      .where('exercicio', '>=', req.body.anoInicial)
      .andWhere('exercicio', '<=', req.body.anoFinal);

    let total = 0;

    for (const registro of registros) {
      const valor = parseFloat(registro.orcamento_inicial);
      if (!Number.isNaN(valor)) {
        total += valor;
      }
    }

    return res.json({ total: Math.round(total * 100) / 100 });
  });
  router.get('/get-despesas-realizada-total', async (req, res) => {
    const registros = await knexClient<DespesasDatabase>('despesas')
      .select('orcamento_realizado')
      .where('exercicio', '>=', req.body.anoInicial)
      .andWhere('exercicio', '<=', req.body.anoFinal);

    let total = 0;

    for (const registro of registros) {
      const valor = parseFloat(registro.orcamento_realizado);
      if (!Number.isNaN(valor)) {
        total += valor;
      }
    }

    return res.json({ total: Math.round(total * 100) / 100 });
  });

  return router;
};
