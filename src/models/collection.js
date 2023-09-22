class Collection {
    constructor(model) {
      this.model = model;
    }
  
    async create(data) {
      try {
        return await this.model.create(data);
      } catch (error) {
        throw error;
      }
    }
  
    async read() {
      try {
        return await this.model.findAll();
      } catch (error) {
        throw error;
      }
    }
  
    async update(id, data) {
      try {
        const [updated] = await this.model.update(data, {
          where: { id },
          returning: true,
        });
        if (!updated) throw new Error('Record not found');
        return updated[1][0];
      } catch (error) {
        throw error;
      }
    }
  
    async delete(id) {
      try {
        const deleted = await this.model.destroy({
          where: { id },
        });
        if (!deleted) throw new Error('Record not found');
        return deleted;
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = Collection;
  