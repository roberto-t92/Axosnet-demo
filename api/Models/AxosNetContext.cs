using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace api.Models
{
    public partial class AxosNetContext : DbContext
    {
        public AxosNetContext()
        {
        }

        public AxosNetContext(DbContextOptions<AxosNetContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Proveedores> Proveedores { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Proveedores>(entity =>
            {
                entity.HasKey(e => e.IdProveedor)
                    .HasName("PK__Proveedo__E8B631AF71559A23");

                entity.Property(e => e.Comentario)
                    .HasMaxLength(400)
                    .IsUnicode(false);

                entity.Property(e => e.Fecha).HasColumnType("datetime");

                entity.Property(e => e.Moneda)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.Monto).HasColumnType("money");

                entity.Property(e => e.Proveedor)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });
        }
    }
}
