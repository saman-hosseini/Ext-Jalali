using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ext.Net
{
    public partial class JalaliDate
    {
        new public abstract partial class Builder<TJalaliDate, TBuilder> : Plugin.Builder<TJalaliDate, TBuilder>
            where TJalaliDate : JalaliDate
            where TBuilder : Builder<TJalaliDate, TBuilder>
        {
            public Builder(TJalaliDate component) : base(component) { }

        }
        public partial class Builder : JalaliDate.Builder<JalaliDate, JalaliDate.Builder>
        {
            public Builder() : base(new JalaliDate()) { }

            public Builder(JalaliDate component) : base(component) { }

            public Builder(JalaliDate.Config config) : base(new JalaliDate(config)) { }

            public static implicit operator Builder(JalaliDate component)
            {
                return component.ToBuilder();
            }
        }

        public JalaliDate.Builder ToBuilder()
        {
            return Ext.Net.X.Builder.JalaliDate(this);
        }

        public override IControlBuilder ToNativeBuilder()
        {
            return (IControlBuilder)this.ToBuilder();
        }
    }


    public partial class BuilderFactory
    {
        public JalaliDate.Builder JalaliDate()
        {
            return this.JalaliDate(new JalaliDate { ViewContext = this.HtmlHelper != null ? this.HtmlHelper.ViewContext : null });
        }

        public JalaliDate.Builder JalaliDate(JalaliDate component)
        {
            component.ViewContext = this.HtmlHelper != null ? this.HtmlHelper.ViewContext : null;
            return new JalaliDate.Builder(component);
        }

        public JalaliDate.Builder JalaliDate(JalaliDate.Config config)
        {
            return new JalaliDate.Builder(new JalaliDate(config) { ViewContext = this.HtmlHelper != null ? this.HtmlHelper.ViewContext : null });
        }
    }
}
